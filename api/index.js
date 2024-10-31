import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { DATABASE_CLOUD } from "./config/config.js";
import mongoose from "mongoose";
 // Import your Auth model

const app = express();

dotenv.config();

// DB connection
mongoose.set("strictQuery", false);
console.log(DATABASE_CLOUD);
mongoose
  .connect(DATABASE_CLOUD)
  .then((con) => console.log(`DB connected with ${con.connection.host}`))
  .catch((err) => console.log(`Connection failed: ${err.message}`));

// Apply middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(morgan("dev"));
app.use(cors());

const port = process.env.PORT || 2020;

// Import & pass in route middleware
import authRoute from "./routes/authRoute.js";
app.use("/api/v1", authRoute);

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
