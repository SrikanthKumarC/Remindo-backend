import { Request, Response } from 'express';
import Event from '../models/events';
import { ObjectId } from 'mongoose';
import { validateEvent } from '../utils/globals';
import User, { IUser } from '../models/user';


const createEvent = async (req: any, res: Response) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(403).send("Unauthorized: userId not found in request.");
        }
        console.log("debug in createEvent userid:", userId);
        let findUser = await User.findById(userId);
        if (!findUser) {
            const user = new User({ _id: userId });
            user.email = req.user.emailAddresses[0].emailAddress;
            const mainUser = await user.save();
            findUser = mainUser;
        }
        req.body.date = new Date(req.body.date).toUTCString();
        if (!findUser) {
            return res.status(403).send("Unauthorized");
        }
        if (findUser?.availableEvents <= 0) {
            return res.status(402).send("You have reached your event limit, either upgrade your account or delete an event to create a new one.");
        }
        console.log(req.body)
        if (req.body.recurringType && req.body.recurringType === "") {
            req.body.recurringType = null;
        }
        const eventData = await validateEvent(req.body);
        eventData.createdBy = findUser._id as any;
        findUser.availableEvents = findUser.availableEvents - 1;
        const newEvent = await Event.create(eventData);
        await newEvent.save();
        await findUser.save();
        res.status(201).send(newEvent.toJSON());
    }
    catch (error: any) {
        console.log("ERROR", error)
        res.status(400).send(error.message);
    }
}


const listEvents = async (req: any, res: Response) => {
    const userId = req.params.userId;
    console.log(userId)
    const user = await User.findOne({ _id: userId });
    if (!user) {
        return res.status(404).send("User not found");
    }
    try {
        const events = await Event.find({ createdBy: user._id });
        res.status(200).send(events);
    }
    catch (error: any) {
        res.status(400).send(error.message);
    }
}

const deleteEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.query;
    if (!id || !userId) {
        return res.status(400).send("Event ID or User ID not found in request");
    }
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).send("Event not found");
        }
        await event.deleteOne();
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        user.availableEvents = user.availableEvents + 1;
        await user.save();
        res.status(200).send("Event deleted");
    }
    catch (error: any) {
        res.status(400).send(error.message);
    }
}

export default { createEvent, listEvents, deleteEvent };