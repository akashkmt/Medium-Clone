import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import Notification from './Components/Notification/Notification';
import {Routes , Route} from "react-router-dom"
import List from './List/list';
import Yourstory from './yourstory/Yourstory';
function App() {
  return (
    <ChakraProvider>
      
     <Routes>
      <Route path="/notification" element={ <Notification/>}/>
      <Route path="/list" element={<List/>}/>
      <Route path="/yourstory" element={<Yourstory/>}/>
     </Routes> 
    </ChakraProvider>
  );
}

export default App;
