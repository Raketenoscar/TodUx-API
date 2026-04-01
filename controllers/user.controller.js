import Todo from "../models/todo.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const updates = req.body;

    if (updates.email) {
      const existingEmail = await User.findOne({
        email: updates.email,
        _id: { $ne: req.user._id },
      }).session(session);
      if (existingEmail) {
        const error = new Error("Email already exists");
        error.status = 409;
        throw error;
      }
    }

    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).select("-password");

    if (!updatedUser) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
export const updateRole = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      const error = new Error("Invalid role");
      error.status = 400;
      throw error;
    }

    const user = await User.findById(id).session(session);
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    user.role = role;
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: { id: user._id, role: user.role },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  const session = await User.startSession();
  session.startTransaction();
  try {
    await Todo.deleteMany({ user: req.user._id }, { session });

    const user = await User.findByIdAndDelete(req.user._id, { session });
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
