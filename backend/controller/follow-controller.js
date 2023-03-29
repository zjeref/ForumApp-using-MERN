const User = require('../model/User')
const asyncHandler = require('express-async-handler')

exports.follow = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { followId } = req.body;

    const user = await User.findById(id);
    if (user.followers.includes(followId)) {
        return res.status(409).json({ message: 'User is already following this user.' });
    }

    const updateFollower = await User.findByIdAndUpdate(id, { $push: { followers: { $each: [followId] } } }, { new: true })
    const updateFollowing = await User.findByIdAndUpdate(followId, { $push: { followings: { $each: [id] } } }, { new: true })
    res.status(200).json(updateFollower)
})

exports.unfollow = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { followId } = req.body;

    const user = await User.findById(id);
    if (!user.followers.includes(followId)) {
        return res.status(400).json({ message: 'User is not following this user.' });
    }

    const updateFollower = await User.findByIdAndUpdate(id, { $pull: { followers: followId } }, { new: true })
    const updateFollowing = await User.findByIdAndUpdate(followId, { $pull: { followings: id } }, { new: true })
    res.status(200).json(updateFollower)
})

exports.isFollowing = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { followId } = req.body;

    const user = await User.findById(id);
    if (user.followers.includes(followId)) {
        return res.status(200).json({ message: 'true' });
    } else {
        return res.status(200).json({ message: 'false' });
    }

})
