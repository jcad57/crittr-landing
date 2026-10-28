import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import Brand from "./Brand";
import { Link } from "react-router-dom";
import { signupHref } from "../lib/signupIntent";
import "./SiteNav.css";
const links = [
  ["How it works", "how-it-works"],
  ["Features", "features"],
  ["Why Crittr", "why-crittr"],
  ["Pricing", "pricing"],
];
export default function SiteNav() {
  const drawer = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);
  function closeMenu() {
    drawer.current?.close();
  }
  function openMenu() {
    drawer.current.showModal();
    setMenuOpen(true);
  }
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="nav">
        <nav className="nav-inner container" aria-label="Main navigation">
          <Brand />
          <div className="nav-links">
            {links.map(([label, id]) => (
              <a href={`/#${id}`} key={id}>
                {label}
              </a>
            ))}
          </div>
          <Link to={signupHref()} className="btn-primary nav-cta">
            Get the app <ArrowRight aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="nav-menu-toggle"
            onClick={openMenu}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={25} />
          </button>
        </nav>
      </header>
      <dialog
        ref={drawer}
        id="mobile-menu"
        className="nav-drawer"
        aria-label="Site navigation"
        onClose={() => setMenuOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className="nav-drawer-inner">
          <div className="nav-drawer-header">
            <Brand onClick={closeMenu} />
            <button
              type="button"
              className="nav-drawer-close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X />
            </button>
          </div>
          <nav className="nav-drawer-links" aria-label="Mobile navigation">
            {links.map(([label, id]) => (
              <a href={`/#${id}`} key={id} onClick={closeMenu}>
                {label}
                <ArrowRight size={20} aria-hidden="true" />
              </a>
            ))}
            <Link to={signupHref()} className="btn-primary" onClick={closeMenu}>
              Get the app <ArrowRight aria-hidden="true" />
            </Link>
          </nav>
          <p>Good care. More good days together.</p>
        </div>
      </dialog>
    </>
  );
}
