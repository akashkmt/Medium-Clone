import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import Login from './Components/Login/Login';
// import Register from './Components/Register/Register';s



function App() {
  return (
    <ChakraProvider>
      <Login/>
      {/* <Register/> */}
    </ChakraProvider>
  );
}

export default App;
