import "../styles/globals.css";
import { Provider, useSession } from "next-auth/client";
import Loading from "../components/LoadingScreen";
import React from "react";

function MyApp({ Component, pageProps }) {
  const [session, loading] = useSession();

  if (loading) return <Loading />;
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
