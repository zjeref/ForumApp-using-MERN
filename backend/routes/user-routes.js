const express = require('express');
const Router = express.Router();
const multer = require('multer');
const { userAuth } = require('../middlewares/userAuth');
const { createAccount, verifyAccount, getAccount, getMe } = require('../controller/user-controller');
const upload = multer();

Router.post('/create', upload.single('avatar'), createAccount)
Router.post('/verify', verifyAccount)
Router.post('/:id', getAccount)
Router.get('/me', userAuth, getMe)

module.exports = Router;