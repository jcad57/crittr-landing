import { Link } from "react-router-dom";
import { signupHref } from "../lib/signupIntent";
import Brand from "./Brand";
import "./Footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-brand">
          <Brand />
          <p>
            Built with care for pets
            <br />
            and the people who love them.
          </p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <div className="footer-col">
            <span className="footer-col-title">Product</span>
            <a href="/#features">How it works</a>
            <a href="/#features">Features</a>
            <a href="/#pricing">Pricing</a>
            <Link to={signupHref()}>
              Download
            </Link>
          </div>
          <div className="footer-col">
            <span className="footer-col-title">Support</span>
            <a href="mailto:support@crittrapp.com">support@crittrapp.com</a>
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/delete-account" className="footer-delete-link">Delete account & data</Link>
          </div>
        </nav>
      </div>
      <div className="footer-bottom container">
        <span>© 2026 Pegasys Studios. All rights reserved.</span>
        <span>
          iOS · Android{" "}
          <span className="footer-android-note">(coming soon)</span>
        </span>
      </div>
    </footer>
  );
}
