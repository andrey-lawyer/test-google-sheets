import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import AppRouter from "./routes";

import connectDB from "./config/database";

const app = express();

app.use(cors());

const router = new AppRouter(app);

connectDB();

app.set("port", process.env.PORT || 6000);

app.use(express.json());

router.init();

const port = app.get("port");

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
