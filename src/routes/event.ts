import express from "express";
const router = express.Router();
import eventController from "../controllers/eventController";
import verifyJWT from "../middleware/verifyJWT";

router.use(verifyJWT);
router.post("/create/:userId", eventController.createEvent);
router.get("/list/:userId", eventController.listEvents);
router.get("/delete/:id", eventController.deleteEvent);

export default router;