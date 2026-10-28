import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SiteNav from "../components/SiteNav";
import Footer from "../components/Footer";

export default function SiteLayout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return (
    <div className="app">
      <SiteNav />
      <Outlet />
      <Footer />
    </div>
  );
}
