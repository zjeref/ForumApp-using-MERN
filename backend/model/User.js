const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    followings: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)