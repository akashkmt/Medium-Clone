import React from 'react'
import { HStack, Avatar, Heading ,Text} from '@chakra-ui/react'
import "./right.css"

export default function RightTwo() {

    return (
        <div className='right'>
            <div>
                <button>Get unlimited access</button>
            </div>
            <div>
                <input type="text" id='search' placeholder="Search" />
            </div>
            <div>
                <li>What We’re Reading Today</li>
            </div>
            <div className='topic'>
                <HStack spacing='18px'>
                    <Avatar size='xs' name='Gaurav Kumar' src='https://bit.ly/broken-link' />
                    <Heading as='h6' size='xs'>Gaurav Kumar</Heading>
                </HStack>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>My 2022 summer lists</Heading>
            </div>
            <div className='topic'>
                <HStack spacing='18px'>
                    <Avatar size='xs' name='Akash Kumawat' src='https://bit.ly/broken-link' />
                    <Heading as='h6' size='xs'>Akash Kumawat</Heading>
                </HStack>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>Can Reading Fiction Make You a Better Person?</Heading>
            </div>
            <div className='topic'>
                <HStack spacing='18px'>
                    <Avatar size='xs' name='Pallav Sharma' src='https://bit.ly/broken-link' />
                    <Heading as='h6' size='xs'>Pallav Sharma</Heading>
                </HStack>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>Hate NFTs? I have some bad news for you…</Heading>
                <Text fontSize='xs' mt={4} color="green.500" cursor="pointer"> See the full list</Text>
            </div>

            <div className='topic'>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>Reading list</Heading>
                <Text fontSize='sm' mt={4} color="gray.600" cursor="pointer"> Click the  on any story to easily add it to your reading list or a custom list that you can share.</Text>
            </div>


            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatum vitae provident amet quisquam voluptate rerum? Non tempore, consectetur repellendus laborum assumenda, illum nobis veniam ut obcaecati asperiores tenetur? Libero?
            </h1>
        </div>
    )
}
