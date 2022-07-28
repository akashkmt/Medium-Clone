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


Create Post = 'http://localhost:8080/createPost'       -- POST
--> headers -- token  (required)
--> if wrong token then returns error with status code 500 with error message
--> if all good then returns status(200).send({message: 'Post created successfully', post: newPost});

Delete Post = 'http://localhost:8080/deletePost/:postId'      -- DELETE
--> headers -- token  (required)
--> params -- postId  (required)
--> if post not found --> return res.status(400).send({message: 'Post does not exist'});
--> if different user wants to delete then return res.status(400).send({message: 'You are not authorized to delete this post'});
--> else delete the post and return res.status(200).send({message: 'Post deleted successfully'});