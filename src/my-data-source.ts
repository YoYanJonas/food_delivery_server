import "reflect-metadata";
import { DataSource } from "typeorm";

export const MyDataSource = new DataSource({
  type: "mysql",
  host: "db",
  port: 3306,
  username: "root",
  password: "root",
  database: "food_delivery",
  timezone: "Z",
  synchronize: true,
  logging: false,
  entities: ["src/entity/*.ts"],
});
