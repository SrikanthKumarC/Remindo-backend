import express from "express";
const router = express.Router();
import eventController from "../controllers/eventController";
import verifyJWT from "../middleware/verifyJWT";

router.use(verifyJWT);
router.post("/create", eventController.createEvent);

export default router;