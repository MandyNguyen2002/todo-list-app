import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { ToDo } from "./entity/Todo";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  entities: ["src/entity/*.ts"],
});
