import { APP_STORE_URL } from "../constants/links";
import "./Hero.css";
import dashboardScreenshot from "../assets/dashboard.png";
import appStoreBadge from "../assets/download-apple.png";
import googlePlayBadge from "../assets/download-google.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const [ua, setUa] = useState("");

  useEffect(() => {
    // Runs exclusively on the client side
    if (typeof window !== "undefined" && navigator.userAgent) {
      setUa(navigator.userAgent);
    }
  }, []);

  const isIOS =
    ua.includes("iPhone") || ua.includes("iPad") || ua.includes("iPod");
  const isAndroid = ua.includes("Android");
  console.log(ua);
  console.log(isIOS);
  console.log(isAndroid);

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="grain" />
      </div>

      <div className="hero-inner">
        <div className="hero-badge">
          <Link to={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
            <img src={appStoreBadge} width={"94px"} alt="Available on iOS" />
          </Link>
          <Link to={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
            <img
              src={googlePlayBadge}
              width={"100px"}
              alt="Available on Google Play"
            />
          </Link>
        </div>

        <h1 className="hero-title">
          Every pet,
          <br />
          <em>simply</em>
          <br />
          cared for.
        </h1>

        <p className="hero-subtitle">
          Crittr removes the stress of remembering and tracking daily care for
          your pets so you have fewer "did we ... ?" moments. Your pets can't
          remind you. Crittr can.
        </p>

        <div className="hero-actions">
          <a
            href={APP_STORE_URL}
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Start for Free
          </a>
          <a href="#features" className="btn-ghost">
            See how it works →
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="phone-frame">
          <div className="phone-screen">
            <img
              src={dashboardScreenshot}
              alt="Crittr home dashboard showing daily progress rings, activity feed, and navigation"
              className="phone-screenshot"
              width={1206}
              height={2622}
              loading="eager"
            />
          </div>
        </div>
        <div className="phone-shadow" />
        <div className="floating-pill pill-1">🐾 Walk logged</div>
        <div className="floating-pill pill-2">💊 Meds on track</div>
        <div className="floating-pill pill-3">👨‍👩‍👧 Shared with Mom</div>
      </div>
    </section>
  );
}
