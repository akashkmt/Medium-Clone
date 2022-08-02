import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { PopupContextProvider } from './Context/PopupContext';
import { LeftNavProvider } from './Context/LeftNavContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
  <ChakraProvider>
  <PopupContextProvider>
  <LeftNavProvider>
  <App />
  </LeftNavProvider>
  </PopupContextProvider>
  </ChakraProvider>
  </BrowserRouter>
);
