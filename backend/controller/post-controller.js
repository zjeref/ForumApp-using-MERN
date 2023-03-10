const asyncHandler = require('express-async-handler');
const Post = require('../model/Post');
const User = require('../model/User');
const Comment = require('../model/Comment');

exports.getPost = asyncHandler(async (req, res) => {
    const posts = await Post.find()
        .sort({ updatedAt: -1 })
        .populate(['author', 'comments'])
    res.status(200).json(posts)
})

exports.createPost = asyncHandler(async (req, res) => {
    const { title, description, tags, author } = req.body;
    const newPost = new Post({
        title: title,
        description: description,
        tags: tags,
        author: author
    })
    await newPost.save();
    res.status(200).json(newPost)
})

exports.updatePost = asyncHandler(async (req, res) => {
    const { postId, updateFields } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(postId, { $set: updateFields }, { new: true });
    res.status(200).json(updatedPost)
})


exports.updateComment = asyncHandler(async (req, res) => {
    const { author, postId, content } = req.body;
    const newComment = await Comment({
        author: author,
        postId: postId,
        content: content
    })
    newComment.save();
    const updatedPost = await Post.findByIdAndUpdate(postId, { $push: { comments: { $each: [newComment] } } }, { new: true })
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: '-password -email'
            }
        })
        .populate('author', '-password -email')
    res.status(200).json(updatedPost)
})


exports.upvote = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const author = req.body.author;
    const currentPost = await Post.findById(postId)
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: '-password -email'
            }
        })
        .populate('author', '-password -email')
    if (currentPost.voters.includes(author)) {
        currentPost.voters.pop(author);
        currentPost.votes -= 1;
        await currentPost.save();
        return res.status(200).json(currentPost);
    }
    currentPost.voters.push(author);
    currentPost.votes += 1;
    await currentPost.save();
    res.status(200).json(currentPost);
});

exports.downvote = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const author = req.body.author;
    const currentPost = await Post.findById(postId)
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: '-password -email'
            }
        })
        .populate('author', '-password -email')
    if (currentPost.voters.includes(author)) {
        currentPost.voters.pop(author);
        currentPost.votes += 1;
        await currentPost.save();
        return res.status(200).json(currentPost);
    }
    currentPost.voters.push(author);
    currentPost.votes -= 1;
    await currentPost.save();
    res.status(200).json(currentPost);
})

//    const updatedPost = await Post.findByIdAndUpdate(postId, { $push: { vote: { $each: [userId] } } }, { new: true });
exports.fetchPostbyAuthor = asyncHandler(async (req, res) => {
    const author = req.params.id;
    const userPosts = await Post.find({ author: author })
    res.status(200).json(userPosts)
})

exports.fetchPostbyId = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const currentPost = await Post.findById(id)
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: '-password -email'
            }
        })
        .populate('author', '-password -email')
    res.status(200).json(currentPost)
})

