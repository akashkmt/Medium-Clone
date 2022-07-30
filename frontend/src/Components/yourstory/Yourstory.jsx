import React, { useState } from 'react'
import "./yourstory.css"
import axios from 'axios'
import { useEffect } from 'react'
import Postlist from './Postlist'
import Draft from './draft'
import { useNavigate } from 'react-router-dom'
import Left from '../LeftParts/left'
import Right from '../RightParts/right'
const Yourstory = () => {
  const [post,setpost] = useState([])
  const[color,setcolor] = useState("#292929")
  const[colorpublic,setcolorpublic] = useState("#e6e6e6")

  const [switchs ,setswitch] =useState(0)
  const navigate = useNavigate()
  let token = (JSON.parse(localStorage.getItem("token")) != undefined)?JSON.parse(localStorage.getItem("token")): "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmUzZDc3ODI4YmQzNTU1MTk4OGM5OTQiLCJpYXQiOjE2NTkxOTgxMzEsImV4cCI6MTY1OTI4NDUzMX0.F3AtJpmDWnSJcdwkWlFd8xq79hHQi2qmz1Y429LtuM0"
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
      <Left/>
            <div className="divss2">
             <div className="flexss0"> <h1>Your stories</h1>
             <button className='new_list_buttons' onClick={()=>{
             navigate("/newstory")
             }}>Write a story</button>
             <button className='new_list_buttones'>Import a story</button></div>
              <div className="flexss">
                <p onClick={()=>{
                  setswitch(0)
                  setcolor("#292929")
                  setcolorpublic("#e6e6e6")
                }}>Drafts</p>
                <p onClick={()=>{
                  setswitch(1)
                  setcolor("#e6e6e6")
                  setcolorpublic("#292929")

                }} >Published</p>
                <p>Responses</p>
              </div>
            <div className="flexss3">
            <div style={{backgroundColor:color}} className="hrbs1"></div>
            <div className="hrbs2"></div>

            <div style={{backgroundColor:colorpublic}} className="hrbs3"></div>

            <div className="hrbs4"></div>
            
           

            </div>
            <div> {
             (switchs==0)?<Draft/>:<Postlist post={post}></Postlist>
            }</div>
           
              <div className="flexss1">
             
              </div>
            </div>
          <Right/>
            </div>   
    </>
  )
}

export default Yourstory