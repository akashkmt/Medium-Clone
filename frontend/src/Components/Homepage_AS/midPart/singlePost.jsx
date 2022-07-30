import React, { useState, useEffect } from 'react'
import "./post.css"
import { Heading } from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import SinglePostCard from "./component/singlePostCard"
import * as ReactDOM from 'react-dom/client';
import Profile from "../RightPart/profile";

export default function SinglePost() {
    const params = useParams();
    // console.log(params)
    // console.log(params.postId);
    const [post, setPost] = useState();


    async function getPost(postId) {
        // console.log(postId)
        const response = await fetch(`http://localhost:8080/getPost/${postId}`).catch((err) => {
            console.log(err);
        });

        const data = await response.json();
        setPost(data);
        console.log(data);
    }
    useEffect(() => {
        // getPost(params.postId).then((response) => setPost(response.data));
        getPost(params.postId)

    }, [])


    const div= document.getElementById('profile');
    const profile = ReactDOM.createRoot(div);

    profile.render(
        post ? (<Profile key={post._id} post={post} />) : null
    );
    

    return (

        <div className='post'>

            <div>
                <Heading as='h5' mt={20} cursor="pointer" size='sm'></Heading>
            </div>

            {
                post ? (
                    <SinglePostCard key={post._id} post={post} />
                ) : null
            }

        </div>
    )
}
