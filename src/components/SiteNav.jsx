import { Link } from "react-router-dom";

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
          <a href="/#pricing" className="nav-cta">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
