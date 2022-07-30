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
                {/* <Link to={"/"}>
                    <img src="./Homepage_AS_Photo/medium.JPG" alt="medium" />
                </Link> */}
                <img src="./Homepage_AS_Photo/medium.JPG" alt="medium" style={{marginLeft:"-20px"}}/>
                
            </div>
            <div className='mid'>
                {/* <Link to={"/notification"}>
                    <GrNotification/>
                </Link> */}
                {/* <MdHome/>
                <GrNotification/> */}
                <img src="./Homepage_AS_Photo/home.JPG" alt="home" />
                <img src="./Homepage_AS_Photo/notification.JPG" alt="home" />
                <img src="./Homepage_AS_Photo/list.JPG" alt="home" />
                <img src="./Homepage_AS_Photo/storie.JPG" alt="home" />
                <img src="./Homepage_AS_Photo/write.JPG" alt="home" />
            </div>
            <div>
                <Avatar style={{ cursor: "pointer",marginLeft:"-20px" }}></Avatar>
            </div>


        </div>

    )
}
