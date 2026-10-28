import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SiteNav from "../components/SiteNav";
import Footer from "../components/Footer";

export default function SiteLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return (
    <div className="app">
      <SiteNav />
      <Outlet />
      <Footer />
    </div>
  );
}
