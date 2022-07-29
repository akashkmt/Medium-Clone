import React from 'react'
import { Avatar, Box ,HStack,Heading,Text} from "@chakra-ui/react"
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
    function sub(str){
        return str.substring(0, 250)
    }
    let content=sub(post.content);

    return (
        <Link to={"/" + post._id}>
            <Box style={{ marginTop: 10 }}>
                <HStack spacing='18px' mt={8}>
                    <Avatar name={post.user.name} />
                    <Heading as='h6' size='xs'>{post.user.name}</Heading>
                </HStack>
                <Heading as='h4' size='md' mt={3}>{post.title}</Heading>
                <Text fontSize='sm' mt={3}>{content}</Text>
                <HStack spacing='18px'mt={4}>
                    <Text fontSize='xs'>4 min read</Text>
                    <Text fontSize='xs'>Selected for you</Text>
                </HStack>
            </Box>
        </Link>
    );

}
