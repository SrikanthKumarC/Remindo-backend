import express from "express";
const router = express.Router();
import eventController from "../controllers/eventController";

router.post("/create", eventController.createEvent);

export default router;