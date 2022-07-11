import express, { json } from "express";
import cors from "cors";
import { MyDataSource } from "./my-data-source";
import { routes } from "./routes";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

MyDataSource.initialize().then(() => {
  const app = express();

  app.use(cookieParser());
  app.use(json());

  app.use(
    cors({
      origin: ["http://localhost:3000"],
    })
  );

  app.use("/", routes);

  app.listen(8000, () => {
    console.log("listening to port 8000");
  });
});
