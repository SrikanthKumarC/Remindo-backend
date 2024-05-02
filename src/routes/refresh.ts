import express from "express";
const router = express.Router();
import handleRefreshToken from "../controllers/refrestTokenController";

router.get("/refresh_token", handleRefreshToken);

export default router;  