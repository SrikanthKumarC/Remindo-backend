import jwt from 'jsonwebtoken';
import User from '../models/user';

require('dotenv').config();

const handleRefreshToken = async (req: any, res: any) => {
    const REFRESH_KEY = process.env.REFRESH_KEY as string;
    const { jwt : token } = req.cookies;
    if (!token) {
        return res.status(403).send("brr");
    }
    const dbUser = await User.findOne({ refreshToken: token });
    if (!dbUser) {
        return res.status(403).send("Unauthorized");
    }

    jwt.verify(token, REFRESH_KEY, async (err: any, user: any) => {
        if (err) {
            return res.status(403).send("Unauthorized");
        }
        const userData = await User.findOne({ email: user.email });
        if (!userData) {
            return res.status(403).send("Unauthorized");
        }
        const accessToken = jwt.sign({ email: userData.email }, process.env.ACCESS_KEY as string, { expiresIn: '15m' });
        res.status(200).send({ accessToken });
    });
};

export default handleRefreshToken;
