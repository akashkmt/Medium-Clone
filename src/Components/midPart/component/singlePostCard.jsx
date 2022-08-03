import React from 'react'
import {Heading, HStack,Text,Box,Avatar} from '@chakra-ui/react'
import { BsDot, BsFillHeartFill } from 'react-icons/bs';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import {BiLink} from 'react-icons/bi';
import { LeftNavContext } from '../../../Context/LeftNavContext';

export default function SinglePostCard({post}) {
    const [liked, setLiked] = React.useState();
    // const {user} = React.useContext(LeftNavContext);
    const [user, setUser] = React.useState();

    const handleLike = () => {
        if(liked){
            dislikePost();
        }
        else{
            likePost();
        }
    }

    const likePost = async () => {
        try {
            await fetch(`https://medium-web-app-backend.herokuapp.com/likePost/${post._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('token')
                }
            });
            setLiked(true);
        } catch (error) {
            console.log(error)
        }
    }

    const dislikePost = async () => {
        try {
            await fetch(`https://medium-web-app-backend.herokuapp.com/dislikePost/${post._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('token')
                }
            });
            setLiked(false);
        } catch (error) {
            console.log(error)
        }
    }

    const checkLiked = (user) => {
        let check = (post.likes).includes(user._id);
        if(check){
            setLiked(true);
        }
        else{
            setLiked(false);
        }
    }
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

      const getUser = async (token) => {
        try {
          let res = await fetch(`https://medium-web-app-backend.herokuapp.com/getUser`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              token
            }
          });
          let user = await res.json(); 
          await setUser(user);
        //   console.log("user",user);
          checkLiked(user);
        } catch (error) {
          console.log(error)
        }
      }

      React.useEffect(()=>{
          if(localStorage.getItem('token')){
            getUser(localStorage.getItem('token'));
          }
          
      },[])
    return (
        <div>
            <Box style={{ marginTop: 10 }}>
                <HStack spacing='25px' mt={8}>
                    <Avatar name={post.user.name}  src={post.user.avatar}/>
                    <div style={{ width:"300px",display:"flex", flexDirection:"column", gap:"5px"}}>
                    <Heading as='h5' size='sm'>{post.user.name}</Heading>
                    <div style={{width:"120px",display:"flex", flexDirection:"row", justifyContent:"left"}}>
                    <Text  fontSize='xs'>{Math.round(Math.random()*7+1)} min read</Text>
                    <BsDot style={{margin:"auto"}} />
                    <Text  fontSize='xs'>{getDate(post.createdAt)}</Text>
                    </div>
                    </div>
                    <div style={{display:"flex", flexDirection:"row", gap:"20px", marginLeft:"80px"}}>
                        <AiOutlineTwitter className='connect-icon' size={25}/>
                        <FaFacebook className='connect-icon' size={25}/>
                        <FaLinkedin className='connect-icon' size={25}/>
                        <BiLink className='connect-icon' size={25}/>
                    </div>
                    <BsFillHeartFill onClick={()=>{handleLike()}} className='heart-icon' color={ liked ? "rgb(207, 55, 38)" : 'gray'} size={25} style={{marginLeft:"100px"}}/>
                </HStack>
                <Heading style={{
                  fontFamily:
                    "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif",
                }} fontSize="32px" fontWeight={700} mt={7}>{post.title}</Heading>
                <Text style={{fontFamily:"charter, Georgia, Cambria, 'Times New Roman', Times, serif", lineHeight:"32px", color:"rgba(41, 41, 41, 1)", overflowWrap:"break-word"}} fontWeight={400} fontSize='20px' mt={6}>{post.content}</Text>
            </Box>
        </div>
    )
}
