import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import HomepageBS from './Components/Homeage_BS/HomepageBS';


function App() {
  return (
    <ChakraProvider>
      <HomepageBS />
    </ChakraProvider>
  );
}

export default App;
