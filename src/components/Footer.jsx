import { Link } from "react-router-dom";
import { APP_STORE_URL } from "../constants/links";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            crittr
          </Link>
          <p>
            Built with care for pets
            <br />
            and the people who love them.
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <span className="footer-col-title">Product</span>
            <a href="/#features">Features</a>
            <a href="/#pricing">Pricing</a>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </div>
          <div className="footer-col">
            <span className="footer-col-title">Support</span>
            <a href="mailto:support@crittrapp.com">support@crittrapp.com</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Pegasys Studios. All rights reserved.</span>
        <span>iOS · Android coming soon</span>
      </div>
    </footer>
  );
}
