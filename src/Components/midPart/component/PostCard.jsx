import React from 'react'
import { Avatar, Box ,HStack,Heading,Text, useToast} from "@chakra-ui/react"
import { Link } from 'react-router-dom';
import { BsDot } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function PostCard({ post, loggedPosts, handleDeletePost }) {
    const toast = useToast()
    function sub(str){
        return str.substring(0, 250)
    }
    let content=sub(post.content);

    const getDate = (createdAt) => {
        var months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        let date = createdAt.split('T')[0].split('-').map(Number);
        return `${date[2]} ${months[date[1] - 1]}`;
      };

    return (
        
            <Box style={{ marginTop: 10 }}>
                <HStack spacing='15px' mt={8}>
                    <Avatar size='sm' name={post.user.name} src={post.user.avatar}/>
                    <Heading fontWeight={500} size='sm'>{post.user.name}</Heading>
                    <BsDot />
                    <Heading fontWeight={500} size='xs'>{getDate(post.createdAt)}</Heading>
                    {
                        loggedPosts ? <RiDeleteBin6Line onClick={()=>{handleDeletePost(post._id);
                            toast({
                                title: 'Post deleted successfully.',
                                  // description: "You are now logged in.",
                                  status: 'success',
                                  duration: 3000,
                                  isClosable: true,
                            })
                            }} size={20} className='delete-button' style={{marginLeft:"20px"}} /> : null
                    }
                </HStack>
                <Link to={"/homepage/" + post._id}>
                <Heading style={{
                  fontFamily:
                    "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif",
                }} as='h4' fontSize={22} mt={3}>{post.title}</Heading>
                <Text style={{fontFamily: "charter, Georgia, Cambria, 'Times New Roman', Times, serif", color:"rgba(41, 41, 41, 1)", letterSpacing:".2px"}} fontSize="16px" mt={3}>{content} . . . .</Text>
                <HStack spacing='5px'mt={4}>
                    <Text fontSize='13px' color='rgba(117, 117, 117, 1)'>{Math.round(Math.random()*7+1)} min read</Text>
                    <BsDot />
                    <Text fontSize='13px' color='rgba(117, 117, 117, 1)'>{loggedPosts ? "Created by you": "Selected for you"}</Text>
                </HStack>
                </Link>
            </Box>
        
    );

}
