
"use client";

import { useEffect, useState } from "react";
import "./blog.css";

export default function BlogPage() {
  const [data, SetData] = useState([]);
  const [messages, SetMessage] = useState("");

  useEffect(() => {
    const Data = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/blog/"
        );

        const result = await response.json();

        console.log("API Response:", result);

        if (response.ok) {
          SetData(result);
         
        } else {
          SetMessage("Error fetching blogs");
        }
      } catch (error) {
        console.log(error);
        SetMessage("Something went wrong");
      }
    };

    Data();
  }, []);

  return (
    <main className="blog-page">

      {/* Blog Header */}
      <div className="blog-header">
        <h1>Latest Blogs</h1>

        <p>
          Explore our latest articles, tutorials,
          and developer guides.
        </p>
      </div>

      {/* Error Message */}
      {messages && (
        <p className="error-message">
          {messages}
        </p>
      )}

      {/* Blog Grid */}
      <div className="blog-grid">

        {data.map((i) => (
          <article
            key={i.blog_id}
            className="blog-card"
          >

            {/* Blog Image */}
            <div className="blog-image-container">
              <img
      src={`http://127.0.0.1:8000/files/${i.content}`}
      alt="{i.title}"
/>

              <span className="blog-category">
                Blog
              </span>
            </div>

            {/* Blog Content */}
            <div className="blog-content">

              {/* Author */}
              <div className="blog-author">

                <div className="author-image">
                  A
                </div>

                <div>
                  <h4>{i.username}</h4>
                </div>

              </div>

              {/* Title */}
              <h2 className="blog-title">
                {i.title}
              </h2>

              {/* Description */}
              <p className="blog-description">
                {i.description}
              </p>

              {/* Date */}
              <div className="blog-info">
                <span>
                  {new Date(i.create_at).toLocaleDateString()}
                </span>
              </div>

              {/* Bottom */}
              <div className="blog-bottom">

                <div className="blog-stats">
                  <span>100 Likes</span>
                  <span>300 Comments</span>
                </div>

              </div>

            </div>

          </article>
        ))}

      </div>

    </main>
  );
}