import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ChakraProvider } from '@chakra-ui/react';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChakraProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ChakraProvider>
  </BrowserRouter>

);
