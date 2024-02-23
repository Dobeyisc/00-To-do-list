import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
//import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark'
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(

<ChakraProvider theme={theme}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</ChakraProvider>  
)
