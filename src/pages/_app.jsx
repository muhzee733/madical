// pages/_app.js
import React from "react";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store";
import "../assets/css/style.css";
import "../assets/css/fontawesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "next-auth/react"; 

function AppWrapper({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}> 
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWrapper Component={Component} pageProps={pageProps} />
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
