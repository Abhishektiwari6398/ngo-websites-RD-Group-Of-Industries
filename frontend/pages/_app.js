// pages/_app.js
import React from "react";
import '../styles/globals.css'; // Import global styles

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}


