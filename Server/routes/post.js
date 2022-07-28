const express = require('express');
const { createPost, deletePost, likePost, dislikePost } = require('../handlers/post');

const postRouter = express.Router();

postRouter.post('/createPost', createPost);
postRouter.delete('/deletePost/:postId', deletePost);
postRouter.post('/likePost/:postId', likePost);
postRouter.post('/dislikePost/:postId', dislikePost);

module.exports = {postRouter};