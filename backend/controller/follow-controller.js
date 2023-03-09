const User = require('../model/User')
const asyncHandler = require('express-async-handler')

exports.follow = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { followId } = req.body;

    const user = await User.findById(id);
    if (user.followings.includes(followId)) {
        return res.status(400).json({ message: 'User is already following this user.' });
    }

    const updateFollowing = await User.findByIdAndUpdate(id, { $push: { followings: { $each: [followId] } } }, { new: true })
    const updateFollower = await User.findByIdAndUpdate(followId, { $push: { followers: { $each: [id] } } }, { new: true })
    res.status(200).json({ message: "followed" })
})

exports.unfollow = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { followId } = req.body;

    const user = await User.findById(id);
    if (!user.followings.includes(followId)) {
        return res.status(400).json({ message: 'User is not following this user.' });
    }

    const updateFollowing = await User.findByIdAndUpdate(id, { $pull: { followings: followId } }, { new: true })
    const updateFollower = await User.findByIdAndUpdate(followId, { $pull: { followers: id } }, { new: true })
    res.status(200).json({ message: "unfollowed" })
})
