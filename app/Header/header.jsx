"use client";
import Link from "next/link";
import "./header.css";
import { useState,useEffect } from "react";
export default function Header() {
  const[isLogin,setlogin]=useState(false)


  useEffect(()=>{
  const token = localStorage.getItem("access_token");
  if(token){
    setlogin(true)
  }
  else{
    setlogin(false)
  }
},[])

  

  return (
    <header className="header">

      <div className="header-container">

        {/* Logo */}
        <Link href="/" className="logo">
          DevBlog
        </Link>

        {/* Navigation */}
        <nav className="nav">

          <Link href="/">
            Home
          </Link>

          <Link href="/blog">
            Blog
          </Link>

         <Link href="/postblog">
          Post
         </Link>
          <Link href="/about">
            About
          </Link>


          <Link href="/profile">
            Profile
          </Link>

        </nav>

        {/* Right Side */}
        <div className="header-right">

          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            className="search"
          />

          
          {
            isLogin?(
           <Link href="/login" className="login-button" 
           onClick={()=>{
            localStorage.removeItem("access_token");
             localStorage.removeItem("refresh_token");
            setlogin(false)
           }}
           >
            Logout
          </Link>
            ):(

          <div>
          <Link href="/login" className="login-button">
            Login
          </Link>

          <Link href="/register" className="login-button">
            Register
          </Link>
        
         
          </div>
            )}

        </div>

      </div>

    </header>
  );
}