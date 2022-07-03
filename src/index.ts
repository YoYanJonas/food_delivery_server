import express, { json } from "express";
import cors from "cors";
import { MyDataSource } from "./my-data-source";

MyDataSource.initialize().then(() => {
  const app = express();

  app.use(json());

  app.use(
    cors({
      origin: ["http://localhost:3000"],
    })
  );

  app.listen(8000, () => {
    console.log("listening to port 8000");
  });
});
