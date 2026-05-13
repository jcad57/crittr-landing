import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { APP_STORE_URL } from "../constants/links";

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerId = useId();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [menuOpen]);

  const overlay = createPortal(
    <>
      <div
        className={`nav-backdrop ${menuOpen ? "nav-backdrop-visible" : ""}`}
        aria-hidden="true"
        onClick={closeMenu}
      />

      <div
        id={drawerId}
        className={`nav-drawer ${menuOpen ? "nav-drawer-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="nav-drawer-header">
          <span className="nav-drawer-title">Menu</span>
          <button
            type="button"
            className="nav-drawer-close"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="nav-drawer-links">
          <a href="/#features" onClick={closeMenu}>
            Features
          </a>
          <a href="/#pricing" onClick={closeMenu}>
            Pricing
          </a>
          <a
            href={APP_STORE_URL}
            className="nav-cta nav-cta-drawer"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Get Started
          </a>
        </div>
      </div>
    </>,
    document.body
  );

  return (
    <nav className="nav" aria-label="Main">
      <div className="nav-inner">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          Crittr
        </Link>
        <div className="nav-links nav-links-desktop">
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
        <button
          type="button"
          className={`nav-menu-toggle ${menuOpen ? "is-open" : ""}`}
          aria-expanded={menuOpen}
          aria-controls={drawerId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="nav-menu-toggle-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {overlay}
    </nav>
  );
}
