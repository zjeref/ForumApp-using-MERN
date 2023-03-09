const express = require('express');
const Router = express.Router();
const {userAuth} = require('../middlewares/userAuth');
const {createAccount, verifyAccount, getAccount, getMe} = require('../controller/user-controller');


Router.post('/create', createAccount)
Router.post('/verify', verifyAccount)
Router.post('/:id', getAccount)
Router.get('/me', userAuth, getMe)

module.exports = Router;