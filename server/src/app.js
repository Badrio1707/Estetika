import express from "express";
import cors from "cors";

import "dotenv/config";
import connectDB from "../config/db.js";
import { PORT } from "../config/env.js";
import authRouter from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Estetika API");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});

export default app;
