import "./Hero.css";
import dashboardScreenshot from "../assets/dashboard.png";

export default function Hero() {
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
          <span className="badge-dot" />
          Available on iOS · Android coming soon
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
          <a href="#pricing" className="btn-primary">
            Start for Free
          </a>
          <a href="#features" className="btn-ghost">
            See how it works →
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">∞</span>
            <span className="stat-label">Activity logs</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">1</span>
            <span className="stat-label">Pet free forever</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">Complete</span>
            <span className="stat-label">Peace of mind</span>
          </div>
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
