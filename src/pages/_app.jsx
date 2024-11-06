// pages/_app.js
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store";
import "../assets/css/style.css";
import "../assets/css/fontawesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider, useSession, getSession } from "next-auth/react";
import { setUser, clearUser } from "../reducers/authSlice";

function AppWrapper({ Component, pageProps }) {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session?.user) {
      dispatch(setUser(session.user));
    } else {
      dispatch(clearUser());
    }
  }, [session, dispatch]);

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

MyApp.getInitialProps = async (context) => {
  const session = await getSession(context.ctx);
  return {
    pageProps: {
      session,
    },
  };
};
