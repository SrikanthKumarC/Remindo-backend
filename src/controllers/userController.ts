import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import userService from '../services/user.service';
import { validateUser } from '../utils/globals';
import jwt from 'jsonwebtoken';
require('dotenv').config();

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
    const ACCESS_KEY = process.env.ACCESS_KEY as string;
    const REFRESH_KEY = process.env.REFRESH_KEY as string;
    try {
        const { email, password } = req.body;
        await validateUser({ email, password });
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }
        const accessToken = jwt.sign({ email: user.email }, ACCESS_KEY, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ email: user.email }, REFRESH_KEY, { expiresIn: '1d' });

        user.refreshToken = refreshToken;
        await user.save();
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).send({accessToken});
    }
    catch (error: any) {
        res.status(400).send(error.message);
    }
};

const logoutController = async (req: Request, res: Response) => {
    try {
        const { jwt: token } = req.cookies;
        if (!token) {
            return res.status(204).send("Not Required");
        }
        const findUserWithToken = await User.findOne({ refreshToken: token });
        if (!findUserWithToken) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
            return res.status(400).send("Invalid Token");
        }
        findUserWithToken.refreshToken = "";
        await findUserWithToken.save();
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        res.status(200).send("Logged out");
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}


export default { signupController, signInController, logoutController };