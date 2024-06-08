import jwt from 'jsonwebtoken';
require('dotenv').config();
import { clerkClient } from '@clerk/clerk-sdk-node';

const verifyJWT = async (req: any, res: any, next: any) => {
    // const userId = req.body.userId;
    // const user = await clerkClient.users.getUser(userId);
    // req.user = user;
    // console.log(user, "debugging user in verifyJWT")
    next();
};

export default verifyJWT;