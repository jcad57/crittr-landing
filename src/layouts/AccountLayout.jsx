import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./AccountLayout.css";

export default function AccountLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return (
    <div className="account-shell">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Outlet />
      <footer className="account-footer">
        <nav aria-label="Account footer">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <a href="mailto:support@crittrapp.com">Need a hand?</a>
        </nav>
      </footer>
    </div>
  );
}
