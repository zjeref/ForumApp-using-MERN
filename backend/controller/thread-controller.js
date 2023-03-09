const Thread = require('../model/Thread')
const asyncHandler = require('express-async-handler')

exports.createThread = asyncHandler(async (req, res) => {
    const {userId, topic, description} = req.body;
    const newThread = new Thread({
        topic: topic,
        description: description,
        admins: [userId]
    })
    await newThread.save();
    res.status(200).json(newThread)
})