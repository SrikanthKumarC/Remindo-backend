import { Request, Response } from 'express';
import Log from '../models/log';

const createLog = async (req: any, res: Response) => {
    try {
        const logData = req.body;
        const newLog = await Log.create({ logMessage: JSON.stringify(logData) });
        await newLog.save();
        res.status(201).send(newLog.toJSON());
    }
    catch (error: any) {
        console.log("ERROR", error)
        res.status(400).send(error.message);
    }
}

export default { createLog };