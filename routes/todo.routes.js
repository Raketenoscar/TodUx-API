import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";

const todoRouter = Router();

todoRouter.get("/", authorize, getTodos);
todoRouter.post("/", authorize, createTodo);
todoRouter.put("/:id", authorize, updateTodo);
todoRouter.delete("/:id", authorize, deleteTodo);

export default todoRouter;
