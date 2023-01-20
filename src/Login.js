import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // added
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);

  const validateForm = () => {
    if(isGoogleSignIn) return {};
    let errors = {};
    let formIsValid = true;

    if (!email) {
      formIsValid = false;
      errors["email"] = "Please enter your email.";
    }

    if (!password) {
      formIsValid = false;
      errors["password"] = "Please enter your password.";
    }

    setError(errors);
    return formIsValid;
  };

  const handleGoogleSignIn = () => {
    setIsGoogleSignIn(true);
    signInWithGoogle();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!isGoogleSignIn){
    if (validateForm()) {
      logInWithEmailAndPassword(email, password);
      setIsLoggedIn(true); // added
    }
    }
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user && isLoggedIn) navigate("/dashboard");
  }, [user, loading, navigate, isLoggedIn]);

  return (
    <form onSubmit={handleSubmit}>
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        {error.email && <p className="error-message error-text">{error.email}</p>}
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {error.password && <p className="error-message error-text">{error.password}</p>}
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={handleGoogleSignIn}>
          Login with Google
        </button>
        
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div> 
      </div>
    </div>
    </form>
  );
}

export default Login;
