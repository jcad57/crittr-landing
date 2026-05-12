import { Link } from "react-router-dom";
import { APP_STORE_URL } from "../constants/links";

export default function SiteNav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          Crittr
        </Link>
        <div className="nav-links">
          <a href="/#features">Features</a>
          <a href="/#pricing">Pricing</a>
          <a
            href={APP_STORE_URL}
            className="nav-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
