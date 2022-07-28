const express = require('express');
const { createUser, loginUser, isLoggedIn } = require('../handlers/user');

const userRouter = express.Router();

userRouter.post('/createUser', createUser);
userRouter.post('/loginUser', loginUser);
userRouter.post('/isLoggedIn', isLoggedIn);


module.exports = {userRouter};