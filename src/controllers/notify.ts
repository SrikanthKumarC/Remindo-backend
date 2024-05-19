import { Request, Response } from 'express';
import Event from '../models/events';
import { startOfDay, endOfDay, formatISO, parseISO } from 'date-fns';

const listDueNotifications = async (req: Request, res: Response) => {
    try {
        const dueNotifications = await Event.find({ date: { $lt: new Date() }, executed: false });
        res.status(200).send(dueNotifications);
    }
    catch (error: any) {
        res.status(400).send(error.message);
    }
}

const todaysNotifications = async (req: Request, res: Response) => {
    try {
        const now = new Date();
        const todayStart = formatISO(startOfDay(now), { representation: 'complete' });
        const todayEnd = formatISO(endOfDay(now), { representation: 'complete' });

        const end = endOfDay(now);
        const todaysNotifications = await Event.find({
            date: { $gte: parseISO(todayStart), $lt: parseISO(todayEnd) },
            executed: false
        });
        res.status(200).send(todaysNotifications);
    }
    catch (error: any) {
        res.status(400).send(error.message);
    }
}

const markNotificationComplete = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        if (!event) {
            throw new Error("Event not found");
        }
        event.executed = true;
        await event.save();
        res.status(200).send("Event marked as completed");
    }
    catch (error: any) {
        res.send(400).send(error.message);
    }
}

export default { listDueNotifications, markNotificationComplete, todaysNotifications };