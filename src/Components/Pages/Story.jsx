import React from 'react'
import { useNavigate } from 'react-router-dom';
import Left from '../LeftNav/LeftNav'
import Right from '../RightParts/right';
import { Heading, Button, SkeletonCircle, Box, Skeleton } from '@chakra-ui/react'
import PostCard from '../midPart/component/PostCard';

function Story() {
  const [userPosts, setUserPosts] = React.useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = React.useState(false);
  const navigate = useNavigate();

  const getUserPosts = async() => {
    try {
      setIsLoadingPosts(true);
      let res = await fetch(`https://medium-web-app-backend.herokuapp.com/getPostsByUser`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        }
      });
      let data = await res.json();
      setUserPosts(data);
      setIsLoadingPosts(false);
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeletePost = async(id) => {
    try {
      // console.log(id)
      await fetch(`https://medium-web-app-backend.herokuapp.com/deletePost/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        }

      });
      getUserPosts();
    } catch (error) {
      console.log(error)
    }
  }
  
  React.useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/');
    }
    else{
      getUserPosts();
    }
  },[])
  return (
    <>
    <Left />
    <Right />
    <div style={{marginLeft:"17%", marginRight:"36%", marginTop:"53px", width:"47%"}}>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
      <Heading style={{
                  fontFamily:
                    "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif",
                }} fontSize="42px" fontWeight={700}>Your stories</Heading>
      <div style={{display:"flex",flexDirection:"row", gap:"20px"}}>
      <Button onClick={()=>{navigate('/create')}} style={{backgroundColor:"green", color:"white", borderRadius:"100px", margin:"auto", marginRight:"0", fontWeight:"450", fontFamily:"sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif"}}>Write a story</Button>
      <Button style={{backgroundColor:"white", color:"green", borderRadius:"100px", margin:"auto", marginRight:"0", fontWeight:"450", fontFamily:"sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif", border:"1px solid green"}}>Import a story</Button>
      </div>
      </div>
      <br />
      <Heading style={{
                  fontFamily:
                    "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif", cursor:"pointer"
                }} mb={2} fontSize="14px" fontWeight={400}>Published {userPosts.length}</Heading>
      <hr style={{backgroundColor:"gray", borderColor:"gray"}} />
      <div style={{display:'flex', flexDirection:'row', justifyContent:"space-between"}}>
        {
          isLoadingPosts ? <div style={{display:"flex", flexDirection:"column", width:"100%"}}>
          <Box mt={10} style={{width:"100%", display:"flex", flexDirection:"column", gap:"10px"}}>
            <Box style={{display:"flex", flexDirection:"row",gap:"20px", width:"60%"}}>
              <SkeletonCircle size="10" />
              <Box style={{display:"flex", flexDirection:"row", gap:"20px", margin:"auto"}}>
                    <Skeleton height={18} width={120}/>
                    <Skeleton height={18} width={100}/>
                </Box>
                <Box style={{margin:"auto", marginRight:"0"}}>
                <Skeleton ml={5} height={30} width={7}/>
                </Box>
            </Box>
            <Skeleton height={30} mt={1}/>
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Box style={{display:"flex", flexDirection:"row", gap:"20px"}}>
            <Skeleton height={18} width={100}/>
            <Skeleton height={18} width={140}/>
            </Box>
          </Box>
          <Box mt={10} style={{width:"100%", display:"flex", flexDirection:"column", gap:"10px"}}>
            <Box style={{display:"flex", flexDirection:"row",gap:"20px", width:"60%"}}>
              <SkeletonCircle size="10" />
              <Box style={{display:"flex", flexDirection:"row", gap:"20px", margin:"auto"}}>
                    <Skeleton height={18} width={120}/>
                    <Skeleton height={18} width={100}/>
                </Box>
                <Box style={{margin:"auto", marginRight:"0"}}>
                <Skeleton ml={5} height={30} width={7}/>
                </Box>
            </Box>
            <Skeleton height={30} mt={1}/>
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Box style={{display:"flex", flexDirection:"row", gap:"20px"}}>
            <Skeleton height={18} width={100}/>
            <Skeleton height={18} width={140}/>
            </Box>
          </Box>
          </div> : <div>
          {
            userPosts?.map((item,index) =>{
              return <PostCard key={index} post={item} loggedPosts={true} handleDeletePost={handleDeletePost}/>
            })
          }
          </div>
        }
      </div>
    </div>
    {/* {
      deletedPost ? <Toast type='deleted' /> : null
    } */}
    </>
  )
}

export default Story