import cors from "cors";
import { DOMAIN, SEC_DOMAIN } from "../config/env.js";
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [DOMAIN, SEC_DOMAIN];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Nicht erlaubt durch CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
export default cors(corsOptions);
