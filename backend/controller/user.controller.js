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
            const user = await User.findOne({ _id: userId });

            if (user) {
                res.status(200).json({
                    _id: user._id,
                    username: user.username,
                    full_name: user.full_name,
                    profilePic: user.profilePic
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
