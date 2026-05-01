import { Outlet } from "react-router-dom";
import SiteNav from "../components/SiteNav";
import Footer from "../components/Footer";

export default function SiteLayout() {
  return (
    <div className="app">
      <SiteNav />
      <Outlet />
      <Footer />
    </div>
  );
}
