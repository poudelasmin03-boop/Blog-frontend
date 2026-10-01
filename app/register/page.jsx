
"use client";

import { useState } from "react";
import "./register.css";
import {useRouter} from "next/navigation";
export default function RegisterPage() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const route = useRouter()

  const handleRegister = async (e) => {

    e.preventDefault();

    if (password !== password2) {
      setMessage("Passwords do not match");
      return;
    }

    const formData = new URLSearchParams();

    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/user/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body: formData,
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {

        setMessage(data.message);
        route.push("/login")

        setUsername("");
        setEmail("");
        setPassword("");
        setPassword2("");

      } 

        else {
          setMessage(data.detail);
        }

      }

    
    catch (error) {

      console.log(error);

      setMessage("Cannot connect to server");

    }
  };


  return (

    <div className="register-container">

      <div className="register-card">

        <h1>Create Account</h1>

        <p>
          Register a new account
        </p>


        <form onSubmit={handleRegister}>

          <div className="form-group">

            <label>
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              required
            />

          </div>


          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>


          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          <div className="form-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={password2}
              onChange={(e) =>
                setPassword2(e.target.value)
              }
              required
            />

          </div>


          <button type="submit">
            Register
          </button>

        </form>


        {message && (
          <p className="message">
            {message}
          </p>
        )}


        <p className="login-link">

          Already have an account?

          {" "}

          <a href="/login">
            Login
          </a>

        </p>

      </div>

    </div>
  );
}

