const express= require('express')
const Router = express.Router();

const {createThread} = require('../controller/thread-controller')

Router.post('/create', createThread)

module.exports = Router;
