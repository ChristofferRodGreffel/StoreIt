import React, { useState } from "react";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        const output = document.querySelector(".resetOutput");
        output.innerHTML = "A password reset link has been sent to you!";
        setEmail("");
      })
      .catch((error) => {
        setEmail("");
        const errorCode = error.code;
        console.log(error.code);
        // ..
      });
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
