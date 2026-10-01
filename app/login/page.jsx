
"use client";

import { useState } from "react";
import "./login.css";
import {useRouter} from "next/navigation";
export default function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
 const route = useRouter()
  const handleLogin = async (e) => {

    e.preventDefault();

    const formData = new URLSearchParams();

    formData.append("username", username);
    formData.append("password", password);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/user/login",
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

        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

       
        setMessage("Login successful");
        route.push("/")

        console.log(
          "Token:",
          data.access_token
        );

      } else {

        if (Array.isArray(data.detail)) {
          setMessage(data.detail[0].msg);
        } else {
          setMessage(data.detail);
        }

      }

    } catch (error) {

      console.log(error);

      setMessage("Cannot connect to server");

    }
  };


  return (

    <div className="login-container">

      <div className="login-card">

        <h1>Welcome Back</h1>

        <p>
          Login to your account
        </p>


        <form onSubmit={handleLogin}>

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


          <button type="submit">
            Login
          </button>

        </form>


        {message && (
          <p className="message">
            {message}
          </p>
        )}


        <p className="register-link">

          Don't have an account?

          {" "}

          <a href="/register">
            Register
          </a>

        </p>

      </div>

    </div>
  );
}
