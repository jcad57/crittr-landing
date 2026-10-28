import "./index.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AccountLayout from "./layouts/AccountLayout";
const Signup = lazy(() => import("./pages/Signup"));
const GetApp = lazy(() => import("./pages/GetApp"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="account-loading" role="status">
            Getting things ready…
          </div>
        }
      >
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
          <Route element={<AccountLayout />}>
            <Route path="/signup" element={<Signup key="signup" />} />
            <Route path="/login" element={<Signup key="login" />} />
            <Route path="/get-app" element={<GetApp />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
