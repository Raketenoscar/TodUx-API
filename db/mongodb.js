import mongoose, { mongo } from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error("DB_URI is not defined in environment variables");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to Database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error Connecting to Database", error);
    process.exit(1);
  }
};

export default connectToDatabase;
