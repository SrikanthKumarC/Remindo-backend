require('dotenv').config();
import { clerkClient } from '@clerk/clerk-sdk-node';
import User from '../models/user';

const verifyJWT = async (req: any, res: any, next: any) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(401).send("Unauthorized");
        }
        const clerkUser = await clerkClient.users.getUser(userId);
        let user = await User.findById(userId);
        if (!user) {
            user = new User({ _id: userId });
            user.email = clerkUser.emailAddresses[0].emailAddress;
            await user.save();
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send("Unauthorized");
    }

    // console.log(user, "debugging user in verifyJWT")

};

export default verifyJWT;