const express = require("express");
require("dotenv").config();
const db = require("./db");
const app = express();
const port = 3000;
const bcrypt = require("bcrypt");
const saltRound = 10;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Todo List App");
});

app.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");

    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/user", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, saltRound);

    const result = await db.query(
      `INSERT INTO users (username, password) VALUES ('${username}','${encryptedPassword}')`
    );

    return res.json(result);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await db.query(
      `SELECT * FROM users WHERE username = :username`,
      {
        username: username,
      }
    );

    const isValid = await bcrypt.compare(password, user.rows[0].password);

    return res.json(isValid);
  } catch (err) {}
});

app.get("/todo", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM todo");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log("Listening to port ", port);
});
