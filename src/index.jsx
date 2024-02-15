import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import customTheme from "./utils/theme";
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import store from "./redux/store";
import { Provider } from 'react-redux';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <ChakraProvider theme={customTheme}>
          <ColorModeScript initialColorMode={"dark"} />
          <App />
        </ChakraProvider>
    </Provider>
  </React.StrictMode>
)
