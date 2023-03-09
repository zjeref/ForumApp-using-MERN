const express = require('express');
const Router = express.Router();

const { getPost, createPost, updatePost, updateComment, upvote, downvote, fetchPostbyAuthor } = require('../controller/post-controller')

Router.get('/', getPost)

Router.post('/create', createPost) //creates new post, Inputs: title, description, tags, userId

Router.put('/update', updatePost) //updates post, Inputs: id,updateFields(object)

Router.put('/update/comment', updateComment) //add comment / updates post, Inputs: userId, postId, content

Router.put('/:id/upvote', upvote) // updates post to upvote, Inputs: postId and userId

Router.put('/:id/downvote', downvote) // updates post to upvote, Inputs: postId and userId

Router.get('/:id', fetchPostbyAuthor) // fetches all post by user

module.exports = Router