import express from "express";
const router = express.Router();
import userController from "../controllers/userController";

router.post("/signup", userController.signupController);
router.post("/signin", userController.signInController);
router.get("/logout", userController.logoutController);
router.post("/reset_password", userController.resetPasswordController);
router.post("/request_password_reset", userController.requestPasswordResetController);
router.post("/reset_password_token", userController.resetPasswordTokenController);

export default router;