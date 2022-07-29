import React from 'react'
import {Heading, HStack,Text,Box,Avatar} from '@chakra-ui/react'

export default function SinglePostCard({post}) {
    return (
        <div>
            <Box style={{ marginTop: 10 }}>
                <HStack spacing='18px' mt={8}>
                    <Avatar name={post.user.name} />
                    <Heading as='h6' size='xs'>{post.user.name}</Heading>
                    <Text fontSize='xs'>4 min read</Text>
                </HStack>
                <Heading as='h3' size='lg' mt={7}>{post.title}</Heading>
                <Text fontSize='lg' mt={6}>{post.content}</Text>
            </Box>
        </div>
    )
}
