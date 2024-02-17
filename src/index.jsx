import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import customTheme from "./utils/theme";
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import store from "./redux/store";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ChakraProvider theme={customTheme}>
          <ColorModeScript initialColorMode={"dark"} />
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
