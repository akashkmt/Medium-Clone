import React from 'react'
import {Heading, HStack,Text,Box,Avatar} from '@chakra-ui/react'

export default function SinglePostCard({post}) {
    return (
        <div>
            <Box style={{ marginTop: 10 }}>
                <HStack spacing='18px' mt={8}>
                    <Avatar name={post.user.name}  />
                    <Heading as='h5' size='sm'>{post.user.name}</Heading>
                    <Text fontSize='xs'>{Math.round(Math.random()*8+2)}min read</Text>
                    <Text fontSize='xs'>July {Math.round(Math.random() * 30+1)}</Text>
                </HStack>
                <Heading as='h3' size='lg' mt={7}>{post.title}</Heading>
                <Text fontSize='lg' mt={6}>{post.content}</Text>
            </Box>
        </div>
    )
}
