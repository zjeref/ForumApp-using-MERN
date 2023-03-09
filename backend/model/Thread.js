const mongoose = require('mongoose')
const Schema = mongoose.Schema

const threadSchema = new Schema({
    topic: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    admins: [{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    posts: [{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }]
})

module.exports = mongoose.model('Thread', threadSchema)