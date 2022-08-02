import { Heading } from '@chakra-ui/react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Left from '../LeftNav/LeftNav'
import Right from '../RightParts/right'

function Notification() {
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
      <Heading style={{
                  fontFamily:
                    "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif",
                }} fontSize="42px" fontWeight={700}>Notifications</Heading>
      <br />
      <Heading style={{
                  fontFamily:
                    "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif", cursor:"pointer"
                }} mb={2} fontSize="14px" fontWeight={400}>All</Heading>
      <hr style={{backgroundColor:"gray", borderColor:"gray"}} />
      <div style={{display:'flex', flexDirection:'row', justifyContent:"space-between", padding:"15px", marginTop:"20px"}}>
        <Heading style={{color:"rgba(117, 117, 117, 1)", fontFamily:"sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif"}} fontSize='14px' fontWeight={400}>You're all caught up.</Heading>
        <Heading style={{color:"rgba(26, 137, 23, 1)", fontFamily:"sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif", cursor:"pointer"}} fontSize='14px' fontWeight={500}>Your stats</Heading>
      </div>
    </div>
    </>
  )
}

export default Notification
