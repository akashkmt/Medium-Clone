import React from 'react'
import { useState } from 'react'

import './Navbar.css'
import { Button } from "@chakra-ui/button" 
import PopupModal from '../PopupModal/PopupModal';
import { PopupContext } from '../../Context/PopupContext';
import { Link } from 'react-router-dom'
// import Login from '../Login/Login'
const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const { setPopup } = React.useContext(PopupContext);

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
  
  
    <div style={{paddingLeft:"100px", paddingRight:"100px"}} className = { navbar ? "navbar active" : "navbar" }>

<div>
<Link to="/"><img src="https://i.ibb.co/8jW928K/medium-logo-removebg-preview.png" alt="medium-logo-removebg-preview" border="0"/></Link>
</div>
  
  <div className = "part-2">

    <div className = "links-box">  
      <ul className = "links">
        <li>Our Story</li>
        <li>Membership</li>
        <li>Write</li>
        <li onClick={()=>{setPopup(false)}}><PopupModal mainTitle='Sign in' /></li>
      </ul>
    </div>
      
    <div>
      <Button onClick={()=>{setPopup(true)}} style = {{ background: navbar ? "green" : "black" ,color:"white",borderRadius:"20px",fontSize:"15px",fontWeight:"400", letterSpacing:".5px" }}><PopupModal mainTitle='Get started' /></Button>
    </div>

    </div>
  </div>
  )
}

export default Navbar

