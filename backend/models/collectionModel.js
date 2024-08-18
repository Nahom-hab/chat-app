import mongoose from "mongoose"

const collectionSchema = mongoose.Schema({

    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }]
}, {
    timestamps: true
})

const Collection = mongoose.model('Collection', collectionSchema)

export default Collection