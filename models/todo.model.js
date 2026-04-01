import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Todo Title is required"],
      maxLength: 100,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Todo must be associated with a User"],
      index: true,
    },
  },
  { timestamps: true },
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
