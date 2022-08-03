import React, { useState, useEffect } from 'react'
import "./post.css"
import { useParams } from "react-router-dom";
import SinglePostCard from "./component/singlePostCard"
import Left from '../LeftNav/LeftNav';
import RightTwo from '../RightParts/rightTwo';
import { Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

export default function SinglePost() {
    const params = useParams();
    // console.log(params)
    // console.log(params.postId);
    const [post, setPost] = useState();
    const [isLoadingPosts, setIsLoadingPosts] = useState(false);

    async function getPost(postId) {
        // console.log(postId)
        setIsLoadingPosts(true);
        const response = await fetch(`https://medium-web-app-backend.herokuapp.com/getPost/${postId}`).catch((err) => {
            console.log(err);
        });

        const data = await response.json();
        setPost(data);
        setIsLoadingPosts(false);
        // console.log(data);
    }
    useEffect(() => {
        // getPost(params.postId).then((response) => setPost(response.data));
        getPost(params.postId)

    },[params.postId])

//this is for profile
    // const div= document.getElementById('profile');
    // const profile = ReactDOM.createRoot(div);

    // profile.render(
    //     post ? (<Profile key={post._id} post={post} />) : null
    // );
    

    return (
<div>
{
    isLoadingPosts ? <>
    <div>
        <Left/>
        {/* <RightTwo userPost={post.user}/> */}
        <div className='post1'>
            <Box style={{display:"flex", flexDirection:"column", gap:"10px"}}>
            <Box style={{display:"flex", flexDirection:"row", gap:"15px"}}>
                <SkeletonCircle size={10} />
                <Box style={{display:"flex", flexDirection:"column", gap:"7px"}}>
                    <Skeleton height={18} width={200}/>
                    <Box style={{display:"flex", flexDirection:"row", gap:"10px"}}>
                        <Skeleton height={15}  width={100}/>
                        <Skeleton height={15} width={90}/>
                    </Box>
                </Box>
                <Box style={{display:"flex", flexDirection:"row", gap:"15px", margin:"auto"}}>
                    <Skeleton height={30} width={10}/>
                    <Skeleton height={30} width={10}/>
                    <Skeleton height={30} width={10}/>
                    <Skeleton height={30} width={10}/>
                </Box>
                <Box style={{margin:"auto", marginRight:"0"}}>
                <Skeleton height={30} width={10}/>
                </Box>
            </Box>
            <Skeleton height={35} mt={2} mb={1} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            </Box>
        </div>
    </div>
    </> : <>
    {
    post ? (
        <div>
         <Left/>
         <RightTwo userPost={post.user}/>
         <div className='post1'>
         <SinglePostCard key={post._id} post={post} />
         </div>
        </div>
    ) : null
}
    </>
}

</div>
       
    )
}
