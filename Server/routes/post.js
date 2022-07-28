const express = require('express');
const { createPost, deletePost } = require('../handlers/post');

const postRouter = express.Router();

postRouter.post('/createPost', createPost);
postRouter.delete('/deletePost/:postId', deletePost);


module.exports = {postRouter};