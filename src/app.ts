import express from "express";
import bodyParser from "body-parser";
const app = express();
import db from "./config/db";
import mongoose from "mongoose";
require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Hello World");
});

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
