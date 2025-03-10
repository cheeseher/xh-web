import React from 'react';
import type { AppProps } from 'next/app';
import { CartProvider } from '../context/CartContext';
import { UserProvider } from '../contexts/UserContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </UserProvider>
  );
}

export default MyApp; 