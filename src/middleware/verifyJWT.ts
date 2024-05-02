import jwt from 'jsonwebtoken';
require('dotenv').config();

const verifyJWT = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(403).send("Unauthorized");
    }
    const token = authHeader.split(' ')[1];
    const ACCESS_KEY = process.env.ACCESS_KEY as string;
    jwt.verify(token, ACCESS_KEY, (err: any, user: any) => {
        if (err) {
            res.status(403).send("Unauthorized");
        } else {
            req.user = user.email;
            next();
        }
    });
};

export default verifyJWT;