import Link from "next/link";
import  "./footer.css"
export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* About */}
        <div className="footer-column">

          <h2>DevBlog</h2>

          <p>
            A simple blog platform where developers
            can share knowledge, tutorials, and ideas.
          </p>

        </div>

        {/* Quick Links */}
        <div className="footer-column">

          <h3>Quick Links</h3>

          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/about">About</Link>

        </div>

        {/* Categories */}
        <div className="footer-column">

          <h3>Categories</h3>

          <Link href="/category/nextjs">
            Next.js
          </Link>

          <Link href="/category/react">
            React
          </Link>

          <Link href="/category/javascript">
            JavaScript
          </Link>

          <Link href="/category/python">
            Python
          </Link>

        </div>

        {/* Social */}
        <div className="footer-column">

          <h3>Follow Us</h3>

          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>

        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">

        <p>
          © 2026 DevBlog. All rights reserved.
        </p>

        <div>
          <Link href="/privacy">
            Privacy Policy
          </Link>

          <Link href="/terms">
            Terms & Conditions
          </Link>
        </div>

      </div>

    </footer>
  );
}