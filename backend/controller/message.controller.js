import Conversation from "../models/collectionModel.js";
import Message from "../models/messageModel.js";
import { getReciverSocketId, io } from "../socket/socket.js";
import { errorHandeler } from "../utils/errorHandler.js";

export const sendMessage = async (req, res, next) => {
    try {
        const reciverID = req.params.id;
        const { message } = req.body;
        const senderID = req.user._id;

        // Find existing conversation between sender and receiver
        let conversation = await Conversation.findOne({
            participants: { $all: [senderID, reciverID] },
        });

        // Create a new conversation if one doesn't exist
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderID, reciverID]
            });
        }

        // Create a new message
        const newMessage = new Message({
            senderID,
            reciverID,
            message
        });
        conversation.messages.push(newMessage._id);

        await Promise.all([newMessage.save(), conversation.save()])

        const reciverSocketID = getReciverSocketId(reciverID)
        if (reciverSocketID) {
            io.to(reciverSocketID).emit('newMessage', newMessage)
        }
        // Respond with the new message
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error); // Log the error for debugging
        next(errorHandeler(500, 'Internal server error'));
    }
};
export const getMessages = async (req, res, next) => {
    if (req.params.id !== null) {
        try {
            const reciverID = req.params.id;
            const senderID = req.user._id;

            // Find existing conversation between sender and receiver
            const conversation = await Conversation.findOne({
                participants: { $all: [senderID, reciverID] },
            });

            // Check if conversation exists
            if (!conversation) {
                res.status(200).json([])
            }

            // Fetch all messages at once using $in
            const messageArray = await Message.find({
                _id: { $in: conversation.messages },
            });

            // Respond with the messages
            res.status(200).json(messageArray);
        } catch (error) {
            console.error(error); // Log the error for debugging
            next(errorHandeler(500, 'Internal server error'));
        }
    }
};

