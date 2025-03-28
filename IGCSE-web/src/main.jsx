import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';

// Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  colors: {
    brand: {
      50: '#f0f8ff',
      100: '#d1e6ff',
      200: '#a8d1ff',
      300: '#7fbcff',
      400: '#57a7ff',
      500: '#2e93ff',
      600: '#0a7bfa',
      700: '#0062d6',
      800: '#004aac',
      900: '#003882',
    },
    accent: {
      primary: '#4c51bf',
      secondary: '#38b2ac',
    },
  },
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      variants: {
        primary: {
          bg: 'brand.600',
          color: 'white',
          _hover: {
            bg: 'brand.700',
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
); 