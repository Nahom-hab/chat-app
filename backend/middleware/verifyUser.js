import jwt from 'jsonwebtoken';
import { errorHandeler } from '../utils/errorHandler.js';
import User from '../models/userModel.js';

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Use req.cookies to access cookies

        if (!token) {
            return next(errorHandeler(401, 'Unauthorized - no token provided'));
        }

        const decode = jwt.verify(token, process.env.SECRET);

        if (!decode) {
            return next(errorHandeler(401, 'Unauthorized - invalid token'));
        }

        const user = await User.findById(decode.userId).select('-password');

        if (!user) {
            return next(errorHandeler(401, 'User not found'));
        }

        req.user = user;
        next();
    } catch (error) {
        next(errorHandeler(500, 'Internal server verify user error'));
    }
};

export default verifyUser;
