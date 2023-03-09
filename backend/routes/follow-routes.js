const express = require('express')
const Router = express.Router();
const {follow, unfollow} = require('../controller/follow-controller')

Router.put('/:id/follow', follow)
Router.put('/:id/unfollow', unfollow)

module.exports = Router