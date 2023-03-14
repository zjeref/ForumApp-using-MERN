const express = require('express')
const Router = express.Router();
const {follow, unfollow, isFollowing} = require('../controller/follow-controller')

Router.put('/:id/follow', follow)
Router.put('/:id/unfollow', unfollow)
Router.put('/:id/isfollow', isFollowing)

module.exports = Router