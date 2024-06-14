require('dotenv').config();
import { clerkClient } from '@clerk/clerk-sdk-node';

const verifyJWT = async (req: any, res: any, next: any) => {
    try {
        const userId = req.params.userId;
        const user = await clerkClient.users.getUser(userId);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send("Unauthorized");
    }

    // console.log(user, "debugging user in verifyJWT")
   
};

export default verifyJWT;