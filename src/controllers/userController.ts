import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import userService from '../services/user.service';
import { validateUser } from '../utils/globals';

const signupController = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        const newUser = await User.create(user);
        res.status(201).send(newUser);
    }
    catch (error: any) {
        if (error.name == "MongoServerError" && error.code === 11000) {
            res.status(400).send("Email already exists");
        } else {
            console.log(error.name)
            res.status(400).send(error.message);
        }
    }
};

const signInController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        await validateUser({email, password});
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }
        res.status(200).send("User signed in successfully");
    }
    catch (error: any) {
        res.status(400).send(error.message);
    }
};


export default { signupController, signInController };