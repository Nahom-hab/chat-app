import mongoose from "mongoose"

const useSchema = mongoose.Schema({
    full_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }, gender: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "default"
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', useSchema)

export default User