import React from 'react'
import { Avatar,  Heading, Text } from '@chakra-ui/react'
import "./right.css"

export default function Profile({ post }) {
    return (
        <>
            <Avatar size='xl' mt={30} ml={40} name={post.user.name} src='https://bit.ly/broken-link' />
            <Heading as='h3' size='lg' ml={40} mt={8}>{post.user.name}</Heading>
            <Heading as='h4' size='md' ml={40} mt={6}>{Math.round(Math.random()*1000+2)} Followers</Heading>

        </>
        
    )
}
