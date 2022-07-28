import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import Homepage from "../src/Components/Homepage_AS/Homepage_AS";


function App() {
  return (
    <ChakraProvider>
      {/* <h1>Hello</h1> */}
      <Homepage/>
    </ChakraProvider>
  );
}

export default App;
