import express from "express";
import bodyParser from "body-parser";
const app = express();
import db from "./config/db";
import mongoose from "mongoose";

import cookieParser from "cookie-parser";

import userRoutes from "./routes/user";
import eventRoutes from "./routes/event";
import refreshTokenRoutes from "./routes/refresh";

import { rateLimit } from 'express-rate-limit'

require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", userRoutes);
app.use("/api/event", eventRoutes);
app.use("/api", refreshTokenRoutes);


if (process.env.NODE_ENV !== "test") {
  db();
  mongoose.connection.once("open", async () => {
    console.warn(process.env.DB_URI);
    console.warn("Connected to the database");
    await app.listen(3000, () => {
      console.log("App listening on port 3000");
    });
  });
}

export default app;
