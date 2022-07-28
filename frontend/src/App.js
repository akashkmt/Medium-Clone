import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import Login from './Components/Login/Login';



function App() {
  return (
    <ChakraProvider>
      <Login/>
    </ChakraProvider>
  );
}

export default App;
