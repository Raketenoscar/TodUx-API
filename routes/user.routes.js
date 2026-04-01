import { Router } from "express";
import {
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authorize, getUser);
userRouter.put("/", authorize, updateUser);
userRouter.delete("/", authorize, deleteUser);

export default userRouter;
