import React from 'react';
import type { AppProps } from 'next/app';
import { CartProvider } from '../context/CartContext';
import { UserProvider } from '../contexts/UserContext';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <CartProvider>
        <Component {...pageProps} />
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </CartProvider>
    </UserProvider>
  );
}

export default MyApp; 