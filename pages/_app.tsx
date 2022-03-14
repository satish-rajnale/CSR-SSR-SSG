import "../styles/globals.css";
import type { AppProps } from "next/app";
import styles from "../styles/Home.module.css";

import { Provider } from "react-redux";
import { store } from "../store/foodReducerStore";
import { useEffect } from "react";
import { auth } from "../functions/Firebase.prod";
import { useAuthState } from "react-firebase-hooks/auth";
import LogIn from "../Components/LogIn";
function MyApp({ Component, pageProps }: AppProps) {
  // hide code from here if running cypress tests -------------------->
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);
  if (loading) {
    return (
      <div className={styles.main}>
        <div className={styles.loginContainer}>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }
  if (!user) {
    return <LogIn />;
  }
  // hide code to here if running cypress tests -------------------->
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
