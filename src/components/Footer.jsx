import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            crittr
          </Link>
          <p>Built with care for pets<br />and the people who love them.</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <span className="footer-col-title">Product</span>
            <a href="/#features">Features</a>
            <a href="/#pricing">Pricing</a>
            <a href="/#pricing">Download</a>
          </div>
          <div className="footer-col">
            <span className="footer-col-title">Support</span>
            <a href="#">Help Center</a>
            <Link to="/privacy">Privacy Policy</Link>
            <a href="#">Send Feedback</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Crittr. All rights reserved.</span>
        <span>iOS & Android</span>
      </div>
    </footer>
  )
}
