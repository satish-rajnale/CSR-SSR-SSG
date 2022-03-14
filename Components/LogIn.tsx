import React from "react";
import { signInWithPopup } from "firebase/auth";
import styles from "../styles/home.module.css";
import { BiLogIn } from "react-icons/bi";
import { auth, provider } from "../functions/Firebase.prod";
function LogIn() {
  const signIn = (e) => {
    e.preventDefault();

    signInWithPopup(auth, provider).catch((error) => alert(error.message));
  };

  return (
    <div className={styles.main}>
      <div className={styles.loginContainer}>
        <h1>Sign In to Resto App</h1>
        <button
          type="button"
          className={styles.addCategorybutton}
          onClick={signIn}
        >
          <span className={styles.button__text}>Sign In with Google</span>
          <span className={styles.button__icon}>
            <BiLogIn />
          </span>
        </button>
      </div>
    </div>
  );
}

export default LogIn;
