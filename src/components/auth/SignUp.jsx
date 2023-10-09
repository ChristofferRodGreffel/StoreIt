import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button";
import authErrorMessages from "./errorMessages";

const SingUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        navigate("/storage");
        setErrorMessage("");
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
      <form onSubmit={signUp}>
        <h1>Let's get you started!</h1>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="auth-error">{errorMessage}</p>
        <Button content="Sign Up" type="submit" />
        <p>
          Already have an account? <Link to="/signin">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default SingUp;
