import React from 'react'
import { Avatar } from '@chakra-ui/react'
import "./left.css"
// import { Link } from 'react-router-dom'

export default function Left() {
    return (
        <div className='left'>
            <div>
                <img src="./Homepage_AS_Photo/medium.JPG" alt="medium" />
            </div>
            <div className='mid'>

                <img src="./Homepage_AS_Photo/home.JPG" alt="home" />
                <img src="./Homepage_AS_Photo/notification.JPG" alt="home" />
                <img src="./Homepage_AS_Photo/list.JPG" alt="home" />
                <img src="./Homepage_AS_Photo/storie.JPG" alt="home" />
                <img src="./Homepage_AS_Photo/write.JPG" alt="home" />
            </div>
            <div>
                <Avatar style={{ cursor: "pointer" }}></Avatar>
            </div>


        </div>

    )
}
