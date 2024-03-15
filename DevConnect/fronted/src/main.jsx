import React from 'react'
import { mode } from "@chakra-ui/theme-tools";
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter  } from 'react-router-dom';
import App from './App.jsx'
import { ColorModeScript } from "@chakra-ui/color-mode";
import './index.css'
import { RecoilRoot } from 'recoil';

const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.100", "#101010")(props),
    },
  }),
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true
};

const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e"
  },
};
const user_theme = extendTheme({ styles, config, colors })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>

    <BrowserRouter>

      <ChakraProvider theme={user_theme}>
        <ColorModeScript initialColorMode={user_theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
)
