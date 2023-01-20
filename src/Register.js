import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [course, setCourse] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);

  
  const validateForm = () => {
    if(isGoogleSignIn) return {};
    const errors = {};
    if (!name) {
      errors.name = "Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    if (!id) {
      errors.id = "ID is required";
    }
    if (!course) {
      errors.course = "Course is required";
    }
    return errors;
  };

  const handleGoogleSignIn = () => {
    setIsGoogleSignIn(true);
    signInWithGoogle();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!isGoogleSignIn){
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      register();
    } else {
      setError(errors);
    }
    }
  };

  const register = () => {
    registerWithEmailAndPassword(name, email, password, id, course);
    navigate("/login");
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/login");
  }, [user, loading, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="register">
        <div className="register__container">
          <input
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          {error.name && <p className="error-message error-text">{error.name}</p>}
          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          {error.email && <p className="error-message error-text">{error.email}</p>}
          <input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {error.password && <p className="error-message error-text">{error.password}</p>}
            <input
            type="text"
            className="register__textBox"
            value={id}
            onChange={(e) => setID(e.target.value)}
            placeholder="KodNest ID"
            />
            {error.id && <p className="error-message error-text">{error.id}</p>}
            <input
            type="text"
            className="register__textBox"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Course"
            />
            {error.course && <p className="error-message error-text">{error.course}</p>}
            <button className="register__btn" type="submit">
            Register
            </button>
            <button
                     className="register__btn register__google"
                     onClick={handleGoogleSignIn}
                   >
            Register with Google
            </button>
            <div>
            Already have an account? <Link to="/">Login</Link> now.
            </div>
            </div>
            </div>
            </form>
            );
            }

            export default Register;
