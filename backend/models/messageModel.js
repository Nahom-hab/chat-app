import mongoose from "mongoose"

const messageSchema = mongoose.Schema({
    SenderID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    reciverID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema)

export default Message