import React from 'react'
import { useNavigate } from 'react-router-dom';
import Left from '../LeftNav/LeftNav'
import Right from '../RightParts/right';
import { Button, Heading } from '@chakra-ui/react';

function Bookmark() {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/');
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
                }} fontSize="42px" fontWeight={700}>Your lists</Heading>
      <Button style={{backgroundColor:"green", color:"white", borderRadius:"100px", margin:"auto", marginRight:"0", width:"100px"}}>New list</Button>
      </div>
      <br />
      <Heading style={{
                  fontFamily:
                    "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif", cursor:"pointer"
                }} mb={2} fontSize="14px" fontWeight={400}>Saved</Heading>
      <hr style={{backgroundColor:"gray", borderColor:"gray"}} />
      <div style={{display:'flex', flexDirection:'row', justifyContent:"space-between", marginTop:"20px"}}>
        <img src="./lists.png" width="100%" alt="" />
      </div>
    </div>
    </>
  )
}

export default Bookmark