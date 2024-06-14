import express from "express";
const router = express.Router();
import userController from "../controllers/userController";
import { upgradePlanController } from "../controllers/planController";
import verifyJWT from "../middleware/verifyJWT";



// router.post("/signup", userController.signupController);
// router.post("/signin", userController.signInController);
// router.get("/logout", userController.logoutController);
// router.post("/reset_password", userController.resetPasswordController);
// router.post("/request_password_reset", userController.requestPasswordResetController);
// router.post("/reset_password_token", userController.resetPasswordTokenController);
router.get('/user/:userId', verifyJWT, userController.getUserDetails);
// plan
router.post("/upgrade_plan", upgradePlanController);

export default router;