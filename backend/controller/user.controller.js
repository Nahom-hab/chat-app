import Conversation from "../models/collectionModel.js";
import User from "../models/userModel.js";
import { errorHandeler } from "../utils/errorHandler.js"

export const getFriends = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const conversations = await Conversation.find({
            participants: userId
        });

        if (conversations.length > 0) {
            const otherParticipantsIds = conversations.map(conversation => {
                return conversation.participants.filter(participant => !participant.equals(userId));
            });

            let users = [];

            for (let i = 0; i < otherParticipantsIds.length; i++) {
                const user = await User.findOne({ _id: otherParticipantsIds[i] });
                users.push(user);
            }


            return res.status(200).json(users);
        }

        res.status(200).json([]);

    } catch (error) {
        console.log(error.message);
        next(errorHandeler(500, 'internal server error'));
    }
};

export const SearchforAllusers = async (req, res, next) => {
    try {
        const { searchTerm } = req.query;

        if (!searchTerm) {
            return res.status(400).json({ message: 'Search term is required' });
        }

        const users = await User.find({
            username: { '$regex': searchTerm, $options: 'i' }
        });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Error searching for users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUser = async (req, res, next) => {
    if (req.params.id !== null) {
        try {
            const userId = req.params.id;
            const user = await User.find({ _id: userId });

            if (user[0]) {
                res.status(200).json({
                    _id: user[0]._id,
                    username: user[0].username,
                    full_name: user[0].full_name,
                    profilePic: user[0].profilePic
                });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Error searching for user:', error);
            res.status(500).json({ message: 'Internal server error' });
            next(error); // Pass the error to the next middleware for centralized error handling
        }
    }
};
import bcrypt from 'bcryptjs';

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandeler(401, 'You can only update your own account'));
    }

    try {
        // Create an object to hold updates
        const updates = {
            username: req.body.username,
            full_name: req.body.full_name,
            profilePic: req.body.profilePic,
        };

        // If password is provided, hash it before saving
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true }
        );

        if (!updatedUser) {
            return next(errorHandeler(404, 'User not found'));
        }

        const { password, ...rest } = updatedUser.toObject(); // Exclude password from response
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
