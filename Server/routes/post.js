const express = require('express');
const { createPost, deletePost, likePost, dislikePost, getAllPosts, getPost, getPostsByUser, createPostWithoutToken } = require('../handlers/post');

const postRouter = express.Router();

postRouter.post('/createPost', createPost);
postRouter.delete('/deletePost/:postId', deletePost);
postRouter.post('/likePost/:postId', likePost);
postRouter.post('/dislikePost/:postId', dislikePost);
postRouter.get('/getAllPosts', getAllPosts);
postRouter.get('/getPost/:postId', getPost);
// postRouter.get('/getPostsByUser/:userId', getPostsByUser);
postRouter.get('/getPostsByUser', getPostsByUser);
postRouter.post('/createPostWithoutToken', createPostWithoutToken);

module.exports = {postRouter};