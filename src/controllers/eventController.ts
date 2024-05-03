import { Request, Response } from 'express';
import Event from '../models/events';
import { ObjectId } from 'mongoose';
import { validateEvent } from '../utils/globals';
import User, { IUser } from '../models/user';


const createEvent = async (req: any, res: Response) => {
    try {
        const findUser = await User.findOne({ email: req.user }) as IUser;
        if (!findUser) {
            return res.status(403).send("Unauthorized");
        }
        if (findUser?.availabeEvents <= 0) {
            return res.status(402).send("You have reached your event limit, either upgrade your account or delete an event to create a new one.");
        }
        const eventData = await validateEvent(req.body);
        eventData.createdBy = findUser._id as ObjectId;
        findUser.availabeEvents = findUser.availabeEvents - 1;
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


export default { createEvent };