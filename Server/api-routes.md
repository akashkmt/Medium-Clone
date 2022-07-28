Create User  = 'http://localhost:8080/createUser'     -- POST
--> body: {
    name: "",
    email: "",
    password: "",
}
--> returns an user object without password with status 200
--> if user already in DB then response status 400  -- {message: 'User already exists'}


Login User  = 'http://localhost:8080/loginUser'     -- POST
--> body: {
    email: "",
    password: "",
}
--> if user doesn't exists in DB then status 400 and {message: 'User does not exist'}
--> if user entered wrong password then status 400 and {message: 'Incorrect password'}
--> if everything is right then status 200 and returns a token of user id


Check User = 'http://localhost:8080/isLoggedIn'     -- POST
--> headers -- token  (required)
--> if all good returns status 200 and returns a object of decoded token and token in response
--> if anything is wrong then returns status 500 with err


Follow A User = 'http://localhost:8080/followUser/:userId'   -- POST
--> headers -- token (required)   logged user
--> params -- userId  --> user that you want to follow
--> if already follows -- return res.status(400).send({message: 'Already following'});
--> else  -- return res.status(200).send({message: 'Followed'});
--> if token is invalid then return res.status(500).send(error);


UnFollow A User = 'http://localhost:8080/unfollowUser/:userId'   -- POST
--> headers -- token (required)   logged user
--> params -- userId  --> user that you want to unfollow
--> if already unfollows -- return res.status(400).send({message: 'Not following'});
--> else  -- return res.status(200).send({message: 'Unfollowed'});
--> if token is invalid then return res.status(500).send(error);


Get User  = 'http://localhost:8080/getUser'   -- GET
--> headers -- token (required)   logged user
--> if error return res.status(500).send(err);
--> else return user details  --> return res.status(200).send(user);


Create Post = 'http://localhost:8080/createPost'       -- POST
--> headers -- token  (required)
--> body : {
    title: "",
    content: ""
}
--> if wrong token then returns error with status code 500 with error message
--> if all good then returns status(200).send({message: 'Post created successfully', post: newPost});

Delete Post = 'http://localhost:8080/deletePost/:postId'      -- DELETE
--> headers -- token  (required)
--> params -- postId  (required)
--> if post not found --> return res.status(400).send({message: 'Post does not exist'});
--> if different user wants to delete then return res.status(400).send({message: 'You are not authorized to delete this post'});
--> else delete the post and return res.status(200).send({message: 'Post deleted successfully'});

Like Post = 'http://localhost:8080/likePost/:postId'  -- POST
Dislike Post = 'http://localhost:8080/dislikePost/:postId'  -- POST
--> headers -- token  (required)  -- logged User
--> params -- postId  (required)
--> if wrong token then returns error with status code 500 with error message
--> if post doesn't exists return res.status(400).send({message: 'Post does not exist'});
--> if already disliked return res.status(400).send({message: 'You have not liked this post'});
--> else return res.status(200).send({message: 'Post disliked successfully'});


Get All Post = 'http://localhost:8080/getAllPosts'
it returns all posts

Get A Single Post = 'http://localhost:8080/getPost/:postId'
--> params -- postId  (required)
--> if wrong postID return res.status(400).send({message: 'Post does not exist'});
--> else return res.status(200).send(post);

Get Posts By User = 'http://localhost:8080/getPostsByUser'
--> headers -- token  (required)  -- logged User
--> if User Doesn't have any post -- return res.status(400).send({message: 'User does not have any posts'});
--> if User Have Post  -- return res.status(200).send(posts);
--> else if any error -- res.status(500).json(err);