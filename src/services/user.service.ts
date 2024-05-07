import bcrypt from 'bcrypt';
import User, { IUser } from "../models/user";
import { validateUser } from '../utils/globals';

const createUser = async (data: IUser) => {
    try {
        const { password } = data;
        console.log(data);
        await validateUser(data);
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({ ...data, password: hashPassword });
        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
}





export default { createUser };