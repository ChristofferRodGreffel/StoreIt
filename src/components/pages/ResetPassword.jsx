import React, { useState } from "react";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import authErrorMessages from "../auth/errorMessages";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const output = document.querySelector(".resetOutput");

  const handleReset = (e) => {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        output.innerHTML = "A password reset link has been sent to you!";
        output.style.color = "green";
        setEmail("");
      })
      .catch((error) => {
        output.style.color = "red";
        console.log(error.code);
        output.innerHTML = getCustomErrorMessage(error.code);
      });
  };

  const getCustomErrorMessage = (error) => {
    return authErrorMessages[error] || "An unknown error occurred. Please try again later.";
  };

  return (
    <div className="sign-in-container reset">
      <div>
        <h1>Forgot your password?</h1>
        <p>No worries. We'll send you reset instructions</p>
      </div>
      <form onSubmit={handleReset}>
        <input type="text" placeholder="Enter your email..." required onChange={(e) => setEmail(e.target.value)} />
        <Button content="Reset password" type="submit" />
        <p className="resetOutput"></p>
      </form>
      <Link to="/signin">
        <i className="fa-solid fa-arrow-left"></i> Back to login
      </Link>
    </div>
  );
};
