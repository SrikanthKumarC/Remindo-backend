import app from "../src/app";
import request from "supertest";
import mongoose from "mongoose";
require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URI || "");
});

describe("GET /", () => {
  test('It should respond with "Hello World"', async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe("Hello World");
    expect(response.status).toBe(200);
  });
});

describe("Database connection", () => {
  test("It should connect to the database", () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
