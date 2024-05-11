import express from "express";
const router = express.Router();
// import notificationController from "../controllers/notificationController";
import notify from "../controllers/notify";


// router.post("/create_notification", notificationController.createNotification);
router.get("/list_notifications", notify.listDueNotifications);
router.put("/mark_notification_complete/:id", notify.markNotificationComplete);

export default router;  