require('dotenv').config();
const asyncHandler = require('express-async-handler');
const axios = require('axios')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User')


exports.createAccount = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;
    const avatar = req.file;
    let imageUrl;

    const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] })
    if (existingUser) {
        return res.status(409).json({ error: 'Already exist' })
    }

    const body = {
        image: avatar.buffer.toString('base64'), // Convert the file buffer to a base64-encoded string
        type: 'base64'
    };

    const headers = {
        Authorization: `Client-ID ${process.env.IMGUR_ID}`, 
    };

    try {
        const res = await axios.post('https://api.imgur.com/3/image', body, { headers });
        imageUrl = res.data.data.link
    } catch (error) {
        return res.status(501).json({ message: 'File Upload Error' });
    }
    const encry_password = bcrypt.hashSync(password)
    const newUser = new User({
        name: name,
        username: username,
        email: email,
        password: encry_password,
        avatar: imageUrl
    })
    await newUser.save()

    //TODO token
    res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        token: generateToken(newUser._id)
    })
})

exports.verifyAccount = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] })

    if (!existingUser) {
        return res.status(404).json({ message: "Account doesn't exist" })
    }

    if (bcrypt.compare(password, existingUser.password)) {
        res.status(200).json({
            _id: existingUser._id,
            name: existingUser.name,
            username: existingUser.username,
            email: existingUser.email,
            token: generateToken(existingUser._id)
        })
    }
    else {
        res.status(401).json({ message: "Password does not match" })
    }
})

exports.getAccount = asyncHandler(async (req, res) => {
    const {id }= req.params;
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: "User does not exist" })

    res.status(200).json(user);
})

exports.getMe = asyncHandler(async (req, res) => {
    res.send(req.user);
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY)
}




