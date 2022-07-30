import React from 'react'
import { useState } from 'react'

import './Navbar.css'
import { Button } from "@chakra-ui/button" 
// import Login from '../Login/Login'
const Navbar = () => {
  const [navbar, setNavbar] = useState(false)

  const changeBackground = () => {
    if ( window.scrollY >= 35){
      setNavbar(true)
    }
    else{
      setNavbar(false)
    }

  }
  window.addEventListener("scroll", changeBackground)

  return( 
  
  
    <div className = { navbar ? "navbar active" : "navbar" }>

<div>
<a href="/"><img src="https://i.ibb.co/8jW928K/medium-logo-removebg-preview.png" alt="medium-logo-removebg-preview" border="0"/></a>
</div>
  
  <div className = "part-2">

    <div className = "links-box">  
      <ul className = "links">
        <li>Our Story</li>
        <li>Membership</li>
        <li>Write</li>
        <li>Sign In</li>
      </ul>
    </div>
      
    <div>
      <Button style = {{ background: navbar ? "green" : "black" ,color:"white",borderRadius:"20px",fontSize:"15px",fontWeight:"200" }}>Get started</Button>
    </div>

    </div>
  </div>
  )
}

export default Navbar

