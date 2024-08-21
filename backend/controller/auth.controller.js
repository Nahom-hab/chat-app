import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandeler } from "../utils/errorHandler.js"; // Ensure the spelling matches your implementation
import GenerateJwtToken from "../utils/GenerateJwtToken.js";

export const signup = async (req, res, next) => {
    try {
        const { full_name, username, gender, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return next(errorHandeler(401, 'User already exists'));
        }

        const profilePic = 'https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ full_name, username, gender, password: hashedPassword, profilePic });

        await newUser.save();
        // GenerateJwtToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            full_name: newUser.full_name,
            profilePic: newUser.profilePic
        });
    } catch (error) {
        console.log(error);

        next(errorHandeler(500, 'Internal server error'));
    }
};

export const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const validUser = await User.findOne({ username });
        if (!validUser) return next(errorHandler(404, 'User not found'));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));

        GenerateJwtToken(validUser._id, res);
        const { password: hashedPassword, ...otherUserData } = validUser._doc;

        res.status(200).json(otherUserData);
    } catch (err) {
        next(errorHandeler(500, 'Internal server error'));
    }
};

export const signout = (req, res, next) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json('User logged out');
    } catch (error) {
        next(error);
    }
};
