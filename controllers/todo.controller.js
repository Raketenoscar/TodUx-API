import Todo from "../models/todo.model.js";
import mongoose from "mongoose";
export const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user._id });

    res.json({ success: true, data: todos, count: todos.length });
  } catch (error) {
    next(error);
  }
};
export const createTodo = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let { title, dueDate } = req.body;
    if (!title) {
      res.status(400).json({ success: false, message: "Title is required" });
      throw new Error("Title is required");
    }
    if (!dueDate) {
      dueDate = null;
    }

    const newTodo = new Todo({
      title,
      dueDate,
      user: req.user._id,
    });

    const newTodos = await Todo.create([newTodo], { session });

    await session.commitTransaction();
    session.endSession();
    res
      .status(201)
      .json({ success: true, message: "Todo Created", data: newTodos[0] });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
export const updateTodo = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const { title, dueDate, completed } = req.body;

    const todo = await Todo.findOne({ _id: id, user: req.user._id }).session(
      session,
    );

    if (!todo) {
      res.status(404);
      throw new Error("Todo not found");
    }
    if (title) {
      todo.title = title;
    }
    if (dueDate) {
      todo.dueDate = dueDate;
    }
    if (completed) {
      todo.completed = completed;
    }

    await todo.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ success: true, message: "Todo Updated", data: todo });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
export const deleteTodo = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id, user: req.user._id }).session(
      session,
    );

    if (!todo) {
      res.status(404);
      throw new Error("Todo not found");
    }

    await todo.deleteOne({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ success: true, message: "Todo Deleted" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
