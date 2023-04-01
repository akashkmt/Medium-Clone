import { Avatar, Button, Input, Textarea, useToast } from '@chakra-ui/react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
// import Toast from '../PopupModal/Toast';
import './Create.css'
// import Left from '../LeftNav/LeftNav'

function Create() {
  const navigate = useNavigate();
  const toast = useToast();
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [logoutPopUp, setLogoutPopUp] = React.useState(false);
  const [user, setUser] = React.useState({});
  // const [createSuccess, setCreateSuccess] = React.useState(false);
  
  const getUser = async (token) => {
    try {
      token = token || localStorage.getItem('token');
      let res = await fetch(`https://medium-backend.onrender.com/getUser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token
        }
      });
      let user = await res.json(); 
      setUser(user);
      // console.log(user);
    } catch (error) {
      console.log(error)
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
}
const handleCreate = async() => {
  console.log(title, content);
  try {
    await fetch(`https://medium-backend.onrender.com/createPost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token')
      },
      body: JSON.stringify({
        title,
        content
      })
    });
    // setCreateSuccess(true);
    // setTimeout(()=>{
    //   setCreateSuccess(false);
    // },3000);
    setTitle("");
    setContent("");
  } catch (error) {
    console.log(error)
  }
}
  React.useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/');
    }
    else{
      getUser(localStorage.getItem('token'));
    }
  },[]);

  return <>
    <div style={{padding:"20px",paddingLeft:"13%",paddingRight:"13%"}}>
    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", height:"50px", fontSize:"16px"}}>
          <div style={{display:"flex", flexDirection:"row", gap:"10px"}}>
          <Link to="/homepage">
            <div style={{ margin:"auto", height:"100%", textAlign:"center", paddingTop:"11px"}}>
            <img style={{margin:"auto"}} width={50}
              src="https://seeklogo.com/images/M/medium-logo-F0ACFCCD58-seeklogo.com.png"
              alt=""
            />
            </div>
          </Link>
          <span  style={{margin:"auto"}}>Drafts in {user.name}</span>
          </div>
          <div style={{display:"flex", flexDirection:"row", gap:"20px"}}>
          <Button onClick={()=>{handleCreate();
          toast({
            title: 'Post created successfully.',
              // description: "You are now logged in.",
              status: 'success',
              duration: 3000,
              isClosable: true,
        });
        }} disabled={(title && content) ? false : true } style={{color:'white', backgroundColor:"green", height:"30px", margin:"auto", borderRadius:"100px", fontWeight:"400"}}>Publish</Button>
          <Avatar onClick={()=>{setLogoutPopUp(!logoutPopUp)}} size='sm' name={user.name} src={user.avatar} style={{margin:"auto", cursor:"pointer"}} />
          {
            logoutPopUp ? <div style={{position:"absolute",top:"70px", bottom:"-15px", right:"165px", zIndex:"1"}}>
              <Button onClick={handleLogout}>Logout</Button>
            </div> : null
          }
          </div>
    </div>
    <div  style={{padding:"50px"}}>
      <Input value={title} onChange={(e)=>{setTitle(e.target.value)}} id='input-Box-create' variant='flushed' placeholder='Title' size="lg"/>
      <Textarea id='textarea-Box-create' value={content} onChange={(e)=>{setContent(e.target.value)}} rows={50} outline='none' style={{outline:"none", border:"none"}} placeholder='Tell Your Story ...'/>
      
    </div>
    <div>
    </div>
    </div>
    
    </>
  
}

export default Create