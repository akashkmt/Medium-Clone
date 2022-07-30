import React, { useState, useEffect } from 'react'
import "./post.css"
import { Heading } from '@chakra-ui/react';
import PostCard from "./component/PostCard";
import Left from '../LeftParts/left';
import Right from '../RightParts/right';

async function getPosts() {
    const response = await fetch("http://localhost:8080/getAllPosts").catch((err) => {
        console.log(err);
    });

    const data = await response.json();
    console.log(data);

    return data;
}

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then((response) => {
            response = response.slice(5,58);
            setPosts(response);
        });    
    }, []);
    return (
        <>
       <div style={{marginTop:"-3vh"}} className="margin"> <Left/></div>
       <div style={{marginTop:"-3vh"}} className="margin">  <Right/></div>
        <div className='post'>
            <div>
                <Heading as='h5' mt={20} cursor="pointer" size='sm'>For you</Heading>
                <hr style={{ color: "black", size: "10", marginTop: "5px" }} />
            </div>
            <div>
                {
                    posts.map(post => {
                        return <PostCard key={post._id} post={post} />
                    })
                }
            </div>

        </div>
       
        </>
    )
}
