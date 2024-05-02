import { Request, Response } from 'express';
import Event from '../models/events';
import { validateEvent } from '../utils/globals';

const createEvent = async (req: Request, res: Response) => {
    try {
        const eventData = await validateEvent(req.body);
        const newEvent = await Event.create(eventData);
        res.status(201).send(newEvent.toJSON());
    }
    catch (error: any) {
        res.status(400).send(error.message);
    }
}

export default { createEvent };