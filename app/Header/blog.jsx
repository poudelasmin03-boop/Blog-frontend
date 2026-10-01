import Link from "next/link";

export default function BlogCard({ blog }) {
  return (
    <article className="blog-card">

      {/* Blog Image */}
      <div className="blog-image-container">
        <img
          src={blog.image}
          alt={blog.title}
          className="blog-image"
        />

        <span className="blog-category">
          {blog.category}
        </span>
      </div>

      {/* Blog Content */}
      <div className="blog-content">

        {/* Author */}
        <div className="blog-author">

          <img
            src={blog.profileImage}
            alt={blog.author}
            className="author-image"
          />

          <div>
            <h4>{blog.author}</h4>
            <p>@{blog.username}</p>
          </div>

        </div>

        {/* Title */}
        <h2 className="blog-title">
          {blog.title}
        </h2>

        {/* Description */}
        <p className="blog-description">
          {blog.description}
        </p>

        {/* Blog Information */}
        <div className="blog-info">

          <span>{blog.date}</span>

          <span>{blog.readTime}</span>

        </div>

        {/* Bottom */}
        <div className="blog-bottom">

          <div className="blog-stats">

            <span>
              {blog.likes} Likes
            </span>

            <span>
              {blog.comments} Comments
            </span>

          </div>

          <Link
            href={`/blog/${blog.id}`}
            className="read-more"
          >
            Read More →
          </Link>

        </div>

      </div>

    </article>
  );
}