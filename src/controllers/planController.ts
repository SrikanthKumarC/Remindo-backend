import { Request, Response } from 'express';
import User from '../models/user';
import { clerkClient } from "@clerk/clerk-sdk-node";
import { getCredits } from '../utils/globals';

const upgradePlanController = async (req: Request, res: Response) => {
    const { plan, userId } = req.body;

    await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
            plan: plan,
        }
    });

    const user = await User.findById(userId);
    if (!user) {
        // create a new user
        const newUser = new User({
            _id: userId,
            userTier: plan,
            availableEvents: getCredits(plan),
        });
        await newUser.save();
    }
    else {
        user.userTier = plan;
        // increase available events and keep the unused events
        user.availableEvents += getCredits(plan);
        await user.save();
    }
    res.status(200).json({ success: true });
}


export { upgradePlanController }