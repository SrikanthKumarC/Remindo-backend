import express from "express";
const router = express.Router();
import userController from "../controllers/userController";

router.post("/signup", userController.signupController);
router.post("/signin", userController.signInController);
router.get("/logout", userController.logoutController);
export default router;