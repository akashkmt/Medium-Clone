const jwt = require('jsonwebtoken');
const { User } = require('../database/user');

//create a new user
const createUser = async(req, res) => {
    try {
        const user = req.body;
        // console.log(user);
        const check = await User.findOne({email: user.email});
        if (check) {
            return res.status(400).send({message: 'User already exists'});
        }
        let newUser = await User.create(user);
        newUser = newUser.toJSON();
        delete newUser.password;
        // console.log(newUser);
        return res.status(200).send(newUser);
    } catch (err) {
        return res.status(500).send(err);
    }
}

//login a user
const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email}).populate('password');
        // console.log(user);
        if (!user) {
            return res.status(400).send({message: 'User does not exist'});
        }
        const isMatch = (user.password === password);
        if (!isMatch) {
            return res.status(400).send({message: 'Incorrect password'});
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
        // const newUser = user.toJSON();
        // delete newUser.password;
        return res.status(200).send({token});
    } catch (err) {
        return res.status(500).send(err);
    }
}

//check if user is logged in
const isLoggedIn = async(req, res) => {
    try {
        const {token} = req.headers;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).send({decoded, token});
    } catch (err) {
        return res.status(500).send(err);
    }
}

//follow a user
const followUser = async(req, res) => {
    try {
        const {userId} = req.params;   //user to follow
        const {token} = req.headers;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);  //user who is following
        const following = user.following;  //array of users who is following
        if (following.includes(userId)) {
            return res.status(400).send({message: 'Already following'});  //if user is already following
        }
        following.push(userId);  //add user to following array
        await User.findByIdAndUpdate(decoded._id, {following});  //update user

        const follower = await User.findById(userId);  //user who is being followed
        const followers = follower.followers;  //array of followers
        if (!followers.includes(decoded._id)) {
            followers.push(decoded._id);  //add user to followers array
            await User.findByIdAndUpdate(userId, {followers});  //update followers array
        }

        return res.status(200).send({message: 'Followed'});
    } catch (err) {
        return res.status(500).send(err);
    }
}

//unfollow a user
const unfollowUser = async(req, res) => {
    try {
        const {userId} = req.params;   //user to unfollow
        const {token} = req.headers;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);  //user who is unfollowing
        const following = user.following;  //array of users who is following
        if (!following.includes(userId)) {
            return res.status(400).send({message: 'Not following'});  //if user is not following
        }
        following.splice(following.indexOf(userId), 1);  //remove user from following array
        await User.findByIdAndUpdate(decoded._id, {following});  //update user

        const follower = await User.findById(userId);  //user who is being unfollowed
        const followers = follower.followers;  //array of followers
        followers.splice(followers.indexOf(decoded._id), 1);  //remove user from followers array
        await User.findByIdAndUpdate(userId, {followers});  //update followers array

        return res.status(200).send({message: 'Unfollowed'});
    } catch (err) {
        return res.status(500).send(err);
    }
}

//get a user
const getUser = async(req, res) => {
    try {
        const {token} = req.headers;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err);
    }
}

//get all users
const getAllUsers = async(req, res) => {
    try {
        const users = await User.find();
        return res.status(200).send(users);
    } catch (err) {
        return res.status(500).send(err);
    }
}

module.exports = {
    createUser,
    loginUser,
    isLoggedIn,
    followUser,
    unfollowUser,
    getUser,
    getAllUsers
}