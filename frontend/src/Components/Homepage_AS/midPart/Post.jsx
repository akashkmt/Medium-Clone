import React from 'react'
import "./post.css"
import { Heading } from '@chakra-ui/react'
export default function Post() {
    return (
        <div className='post'>
            <div>
                <Heading as='h5' mt={20} cursor="pointer" size='sm'>For you</Heading>
                <hr style={{ color:"black" ,size:"10", marginTop:"5px" }} />
            </div>

        </div>
    )
}
