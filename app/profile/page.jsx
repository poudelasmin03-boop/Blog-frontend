
"use client";

import { useEffect, useState } from "react";

import "./profile.css";

export default function ProfilePage() {

  const [message, setMessage] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {

    const Profile = async () => {

      // Get access token first
      let token = localStorage.getItem("access_token");

      const refreshToken = localStorage.getItem("refresh_token");

      if (!token) {
        setMessage("Please login first");
        return;
      }

      // First request using access token
      let response = await fetch(
        "http://127.0.0.1:8000/user/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Access token expired
      if (response.status === 401) {

        if (!refreshToken) {
          setMessage("Please login again");
          return;
        }

        // Send refresh token to FastAPI
        const formData = new URLSearchParams();

        formData.append("refresh_token", refreshToken);

        const refreshResponse = await fetch(
          "http://127.0.0.1:8000/user/refresh",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
          }
        );

        const refreshData = await refreshResponse.json();

        // Refresh token is also invalid/expired
        if (!refreshResponse.ok) {

          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");

          setMessage("Session expired. Please login again");

          return;
        }

        // Save new access token
        token = refreshData.access_token;

        localStorage.setItem(
          "access_token",
          token
        );

        // Try profile request again
        response = await fetch(
          "http://127.0.0.1:8000/user/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      const responseData = await response.json();

      if (response.ok) {

        console.log("Profile data:", responseData);

        setData(responseData);

      } else {

        if (Array.isArray(responseData.detail)) {

          setMessage(
            responseData.detail[0].msg
          );

        } else {

          setMessage(
            responseData.detail || "Something went wrong"
          );

        }
      }
    };

    Profile();

  }, []);


  if (message) {

    return (
      <div className="profile-container">

        <div className="profile-card">

          <p className="error-message">
            {message}
          </p>

        </div>

      </div>
    );
  }


  return (

    <div className="profile-container">

      <div className="profile-card">

        {/* Profile Header */}

        <div className="profile-header">

          <div className="profile-avatar">

            {data.username?.charAt(0).toUpperCase()}

          </div>

          <h1>{data.username}</h1>

          <p>Your Profile</p>

        </div>


        {/* Profile Information */}

        <div className="profile-info">

          <div className="profile-row">

            <span>User ID</span>

            <strong>
              {data.userid}
            </strong>

          </div>


          <div className="profile-row">

            <span>Username</span>

            <strong>
              {data.username}
            </strong>

          </div>


          <div className="profile-row">

            <span>Email</span>

            <strong>
              {data.email}
            </strong>

          </div>

        </div>


        {/* My Posts */}

        <div className="my-posts">

          <h2>My Posts</h2>

          {data.blogs?.length === 0 ? (

            <p>You have not created any posts yet.</p>

          ) : (

            <div className="my-post-grid">

              {data.blogs?.map((post) => (

                <article
                  key={post.blog_id}
                  className="my-post-card"
                >

                  <img
                    src={`http://127.0.0.1:8000/files/${post.content}`}
                    alt={post.title}
                  />

                  <div className="my-post-content">

                    <h3>
                      {post.title}
                    </h3>

                    <p>
                      {post.description}
                    </p>

                    <small>
                      {new Date(
                        post.create_at
                      ).toLocaleDateString()}
                    </small>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>


        {/* Logout */}

        <button
          className="logout-button"
          onClick={() => {

            localStorage.removeItem("access_token");

            localStorage.removeItem("refresh_token");

            window.location.href = "/login";

          }}
        >
          Logout
        </button>

      </div>

    </div>
  );
}
