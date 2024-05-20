import express from "express";
const router = express.Router();
import logController from "../controllers/logController";

router.post("/log", logController.createLog);

export default router;