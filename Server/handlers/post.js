const jwt = require('jsonwebtoken');
const { Post } = require('../database/post');

//create a new post
const createPost = async(req, res) => {
    try {
        const {token} = req.headers;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const post = req.body;
        post.user = decoded._id;
        // console.log(post);
        // const newPost = await (await Post.create(post)).populate('user');
        const newPost = await (await Post.create(post))
        // return res.status(200).send(newPost);
        return res.status(200).send({message: 'Post created successfully', post: newPost});
        // console.log(decoded);
    } catch (err) {
        res.status(500).json(err);
    }
}

//Delete a post
const deletePost = async(req, res) => {
    try {
        const {token} = req.headers;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = req.params.postId;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(400).send({message: 'Post does not exist'});
        }
        if (post.user.toString() !== decoded._id.toString()) {
            return res.status(400).send({message: 'You are not authorized to delete this post'});
        }
        await Post.findByIdAndDelete(id);
        return res.status(200).send({message: 'Post deleted successfully'});
    } catch (err) {
        res.status(500).json(err);
    }
}

//like a post
const likePost = async(req, res) => {
    try {
        const {token} = req.headers;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = req.params.postId;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(400).send({message: 'Post does not exist'});
        }
        if (post.likes.includes(decoded._id)) {
            return res.status(400).send({message: 'You have already liked this post'});
        }
        post.likes.push(decoded._id);
        // await post.save();
        await Post.findByIdAndUpdate(id, {likes: post.likes});
        return res.status(200).send({message: 'Post liked successfully'});
    } catch (err) {
        res.status(500).json(err);
    }
}

//unlike a post
const unlikePost = async(req, res) => {
    try {
        const {token} = req.headers;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = req.params.postId;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(400).send({message: 'Post does not exist'});
        }
        if (!post.likes.includes(decoded._id)) {
            return res.status(400).send({message: 'You have not liked this post'});
        }
        post.likes = post.likes.filter(like => like.toString() !== decoded._id.toString());
        // await post.save();
        await Post.findByIdAndUpdate(id, {likes: post.likes});
        return res.status(200).send({message: 'Post unliked successfully'});
    } catch (err) {
        res.status(500).json(err);
    }
}



module.exports = {
    createPost,
    deletePost,
    likePost,
    unlikePost
}