import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
// import './index.css';
import App from './App';
import { BookContextProvider } from './contexts/BookContext';
import { AuthContextProvider } from './contexts/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider theme={{
      globalStyles: (theme) => ({
        body: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
        }        
      }),
      primaryColor: 'green'
    }} withGlobalStyles withNormalizeCSS>
      <AuthContextProvider>
        <BookContextProvider>
          <App />
        </BookContextProvider>
      </AuthContextProvider>
    </MantineProvider>
  </React.StrictMode>
);
