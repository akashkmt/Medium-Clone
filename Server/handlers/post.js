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



module.exports = {
    createPost,
    deletePost
}