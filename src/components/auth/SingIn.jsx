import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect } from "react";
import { useState } from "react";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button";
import authErrorMessages from "./errorMessages";

const SingIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to the startpage
        navigate("/storage");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

  const signIn = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        navigate("/storage");
      })
      .catch((err) => {
        setErrorMessage(getCustomErrorMessage(err.code));
      });
  };

  const getCustomErrorMessage = (errorCode) => {
    return authErrorMessages[errorCode] || "An unknown error occurred. Please try again later.";
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Log in to start organizing!</h1>
        <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <p className="auth-error">{errorMessage}</p>
        <Button content="Log In" type="submit" />
        <p>
          Need an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p>
          Forgot your password? <Link to="/reset">Reset password</Link>
        </p>
      </form>
    </div>
  );
};

export default SingIn;
