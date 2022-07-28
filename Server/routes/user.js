const express = require('express');
const { createUser, loginUser, isLoggedIn, followUser, unfollowUser, getUser } = require('../handlers/user');

const userRouter = express.Router();

userRouter.post('/createUser', createUser);
userRouter.post('/loginUser', loginUser);
userRouter.post('/isLoggedIn', isLoggedIn);
userRouter.post('/followUser/:userId', followUser);
userRouter.post('/unfollowUser/:userId', unfollowUser);
userRouter.get('/getUser', getUser);

module.exports = {userRouter};