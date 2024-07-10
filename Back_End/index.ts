import { config } from "dotenv";
config();
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";

import { AppDataSource } from "./src/data-source";
import { UserController } from "./src/controller/UserController";
import { Container } from "typedi";

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // setup express app here
    // ...
    app.get("/", (req, res) => {
      res.send("Welcome to Todo List App");
    });

    app.get("/users", async (req, res) => {
      try {
        const userController = Container.get(UserController);
        const results = await userController.getAll();

        return res.json(results);
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    });

    app.get("/todo", async (req, res) => {
      try {
        const userController = Container.get(UserController);
        const results = await userController.getAllTodo();

        return res.json(results);
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    });

    app.get("/user/:id", async (req: Request, res: Response) => {
      try {
        const id = req.params.id;
        const userController = Container.get(UserController);
        const result = await userController.getOne(id);

        return res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
      }
    });

    app.post("/user", async (req: Request, res: Response) => {
      try {
        const userController = Container.get(UserController);
        const result = await userController.save(req, res);
        console.log(`Added user: ${result.username}`);
        res.send(`Added user: ${result.username}`);
        return res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
      }
    });

    app.delete("/user/:id", async (req: Request, res: Response) => {
      try {
        const id = req.params.id;
        const userController = Container.get(UserController);
        const result = await userController.remove(req, res);
        return res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
      }
    });

    // start express server
    app.listen(3000);
  })
  .catch((error) => console.log(error));
