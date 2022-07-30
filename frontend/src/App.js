import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import Notification from './Components/Notification/Notification';
import {Routes , Route} from "react-router-dom"
import Yourstory from './Components/yourstory/Yourstory';
import List from './Components/List/list';
import Newstory from './Components/New story/Newstory';
import Right from './Components/RightParts/right';
import Posts from "./Components/midPart/Posts"
import SinglePost from "./Components/midPart/singlePost"


function App() {
  return (
    <ChakraProvider>
      
     <Routes>
     <Route path="/" element={<Posts></Posts>}/>
     <Route path="/:postId" element={<SinglePost />} />
      <Route path="/notification" element={ <Notification/>}/>
      <Route path="/list" element={<List/>}/>
      <Route path="/yourstory" element={<Yourstory/>}/>
      <Route path="/newstory" element={<Newstory/>}/>
     </Routes> 
    </ChakraProvider>
  );
}

export default App;
