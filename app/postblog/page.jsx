
"use client";

import { useState } from "react";
import "./post.css";

export default function BlogPost() {
  
  const [message, SetMessage] = useState("");
  const[title,SetTitle]=useState("")
  const[content,SetContent]=useState("")

  const[description,SetDescription]=useState("")


 

   

  const handleSubmit = async(e) => {
    // const token = localStorage.getItem("access_token");
    const formdata = new FormData()
    formdata.append("title",title);
    formdata.append("content",content);
    formdata.append("description",description);
    e.preventDefault();
    
      const token = localStorage.getItem("access_token");
     
    const response = await fetch("http://127.0.0.1:8000/blog/",{
      method:"POST",
      headers:{
       Authorization: `Bearer ${token}`,
      },
      body:formdata
    });
    const data = await response.json()

    if(response.ok){

      console.log("ok")
    }
    else{
      console.log("error")
    }
    

  
    alert("Blog post created");
  };

  return (
    <main className="blog-post-page">

      <div className="blog-post-container">

        <div className="blog-post-header">
          <h1>Create Blog Post</h1>
          <p>
            Share your thoughts, tutorials, and ideas with your readers.
          </p>
        </div>

        <form
          className="blog-post-form"
        
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label htmlFor="title">
              Blog Title
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => SetTitle(e.target.value)}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(e) => SetDescription(e.target.value)}
              placeholder="Enter a short description"
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">
              Blog Image
            </label>

            <input
              id="content"
              type="file"
              accept="image/*"
              onChange={(e) => SetContent(e.target.files[0])}
              required
            />
          </div>

          {content && (
            <div className="selected-file">
              <p>
                Selected image:
              </p>

              <span>
                {content.name}
              </span>
            </div>
          )}

          <button
            type="submit"
            className="submit-button"
          >
            Create Post
          </button>

        </form>

      </div>

    </main>
  );
}

