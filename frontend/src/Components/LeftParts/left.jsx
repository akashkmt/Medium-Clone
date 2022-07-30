import React from 'react'
import { Avatar } from '@chakra-ui/react'
import "./left.css"
import {GrNotification} from "react-icons/gr"
import { MdHome } from "react-icons/md";
import { Link } from 'react-router-dom'

export default function Left() {
    return (
        <div className='left'>
            <div>
             
               
                
            </div>
            <div className='mid'>
                {/* <Link to={"/notification"}>
                    <GrNotification/>
                </Link> */}
                {/* <MdHome/>
                <GrNotification/> */}
                <div className="tem0"> <img src="./Homepage_AS_Photo/medium.JPG" alt="medium" /></div>
               <div className="tem1"><Link to="/" > <img src="./Homepage_AS_Photo/home.JPG" alt="home" /></Link></div>
              <div className="tem1"> <Link to="/notification"> <img src="./Homepage_AS_Photo/notification.JPG" alt="home" /></Link></div>
               
               <div className="tem1"><Link to="/list" > <img src="./Homepage_AS_Photo/list.JPG" alt="home" /></Link></div>
        <div className="tem1">       <Link to="/yourstory" > <img src="./Homepage_AS_Photo/storie.JPG" alt="home" /></Link></div>
              <div className="tem1"> <Link to="/newstory" > <img src="./Homepage_AS_Photo/write.JPG" alt="home" /></Link></div>
            </div>
            <div>
                <Avatar marginLeft={"-2vh"} marginTop={"10vh"} w={"2.5vw"} h={"5vh"} style={{ cursor: "pointer" }}></Avatar>
            </div>


        </div>

    )
}
