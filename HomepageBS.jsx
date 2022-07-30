import React from 'react'
import Navbar from "./Navbar"
import {useEffect,useState} from "react"
import "./HomepageBS.css"


function HomepageBS() {


const [allPosts, setAllPosts] = useState([])


const getAllPosts = async () => {
  try {
    let res = await fetch ("http://localhost:8080/getAllPosts")
    let data = await res.json()
    setAllPosts(data)
    console.log(data)
  } catch (error) {
    console.log("error")
  }
}

useEffect(()=>{
    getAllPosts()
 },[])

  return (
    <div>
      <Navbar/>

       <div className = "banner">

         <div>
            <h1>Stay curious.</h1>
            <p>Discover stories, thinking, and expertise from writers on any topic.</p>
            <button>Start reading</button>
         </div>

         <div>
                       
         </div>
       </div>

        <div className = "trending">
          <a href="/"><img src="https://i.im.ge/2022/07/28/F9BO9K.png" alt="F9BO9K.png" border="0"/></a>
        </div>
        <br/>

      <div className = "blogs">

          <div className = "posts">
              {allPosts.map((post) => (<div key = {post.id}>
                <h4>{post.user.name}</h4>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
              </div>))}
          </div>

          <div className = "discover">
              <h1>DISCOVER MORE OF WHAT MATTERS TO YOU</h1>

              <div className = "explore">
          
              </div>

              <div className = "info">
                <p>Help</p>
                <p>Status</p>
                <p>Writers</p>
                <p>Blog</p>
                <p>Careers</p>
                <p>Privacy</p>
                <p>Terms</p>
                <p>About</p>
                <p>Knowable</p>
              </div>

          </div>
       </div>
       
    
    </div>


  )
}

export default HomepageBS