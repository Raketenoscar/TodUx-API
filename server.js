import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";

import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import todoRouter from "./routes/todo.routes.js";
import connectToDatabase from "./db/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import corsOptions from "./middlewares/cors.middleware.js";

const app = express();
const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(corsOptions);
app.use(cookieParser());
app.use(arcjetMiddleware);
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);
app.get("/cheatsheet", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cheatsheet.html"));
});
app.get("/{*splat}", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.use((req, res) => {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "404 Not Found" });
  }
  res.json({ message: "404 Not Found" });
});

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Running on http://localhost:${PORT}`);
  await connectToDatabase();
});
