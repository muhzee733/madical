// pages/_app.js
import React from 'react';
import "../assets/css/style.css";
import "../assets/css/fontawesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";


export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
