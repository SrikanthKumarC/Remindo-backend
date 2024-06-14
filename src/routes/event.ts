import express from "express";
const router = express.Router();
import eventController from "../controllers/eventController";
import verifyJWT from "../middleware/verifyJWT";

router.post("/create/:userId", verifyJWT, eventController.createEvent);
router.get("/list/:userId", verifyJWT, eventController.listEvents);
router.get("/delete/:id", eventController.deleteEvent);

export default router;