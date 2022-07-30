import React, { useState } from 'react'
import "./yourstory.css"
import axios from 'axios'
import { useEffect } from 'react'
import Postlist from './Postlist'
import Draft from './draft'
import { useNavigate } from 'react-router-dom'
const Yourstory = () => {
  const [post,setpost] = useState([])
  const [switchs ,setswitch] =useState(0)
  const navigate = useNavigate()
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmUzZDc3ODI4YmQzNTU1MTk4OGM5OTQiLCJpYXQiOjE2NTkwOTkyNzIsImV4cCI6MTY1OTE4NTY3Mn0.XXA2yuX6hpELj24QezTG3FmIfUp1tKyJKqD5aXIJjOM"
  const fetches = () => {
       axios.get("http://localhost:8080/getPostsByUser",{
             headers:{
              token: token
             }
       }).then((res)=>{
        console.log(res.data)
        setpost(res.data)
       }).catch((err)=>{
        console.log(err)
       }) 
  }

useEffect(()=>{
  fetches()
},[])

  return (
    <>
     <div className="mainss">
        <div className="divss1">
            </div>
            <div className="divss2">
             <div className="flexss0"> <h1>Your stories</h1>
             <button className='new_list_buttons' onClick={()=>{
             navigate("/newstory")
             }}>Write a story</button>
             <button className='new_list_buttones'>Import a story</button></div>
              <div className="flexss">
                <p onClick={()=>{
                  setswitch(0)
                }}>Drafts</p>
                <p onClick={()=>{
                  setswitch(1)
                }} >Published</p>
                <p>Responses</p>
              </div>
            <div className="flexss3">
            <div className="hrbs1"></div>
            <div className="hrbs2"></div>
            
           

            </div>
            <div> {
             (switchs==0)?<Draft/>:<Postlist post={post}></Postlist>
            }</div>
           
              <div className="flexss1">
             
              </div>
            </div>
            <div className="divss3"></div>
            </div>   
    </>
  )
}

export default Yourstory