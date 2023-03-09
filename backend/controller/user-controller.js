const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User')


exports.createAccount = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] })
    if (existingUser) {
        return res.status(409).json({ error: 'Already exist' })
    }

    const encry_password = bcrypt.hashSync(password)
    const newUser = new User({
        name: name,
        username: username,
        email: email,
        password: encry_password
    })
    await newUser.save()

    //TODO token
    res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
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
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).select('-password');
    if (!user) return res.status(404).json({ message: "User does not exist" })

    res.status(200).json(user);
})

exports.getMe = asyncHandler(async (req, res) => {
    res.send(req.user);
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY)
}




