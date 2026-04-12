import "./Hero.css";

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
          Available on iOS & Android
        </div>

        <h1 className="hero-title">
          Every pet,
          <br />
          <em>perfectly</em>
          <br />
          cared for.
        </h1>

        <p className="hero-subtitle">
          Crittr keeps daily care, health history, and household coordination in
          one calm, organized place — built for the people who love their
          animals most.
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
            <span className="stat-num">AI</span>
            <span className="stat-label">Pet assistant</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="phone-frame">
          <div className="phone-screen">
            <div className="mock-header">
              <span className="mock-logo">crittr</span>
              <div className="mock-avatar" />
            </div>
            <div className="mock-pet-card">
              <div className="mock-pet-photo">🐕</div>
              <div className="mock-pet-info">
                <span className="mock-pet-name">Biscuit</span>
                <span className="mock-pet-detail">
                  Golden Retriever · 3 yrs
                </span>
              </div>
              <div className="mock-status">✓ All good</div>
            </div>
            <div className="mock-section-title">Today's Care</div>
            <div className="mock-activities">
              <div className="mock-activity done">
                <span className="act-icon">🦮</span>
                <div className="act-info">
                  <span>Morning walk</span>
                  <span className="act-time">7:23 AM · 22 min</span>
                </div>
                <span className="act-check">✓</span>
              </div>
              <div className="mock-activity done">
                <span className="act-icon">🍗</span>
                <div className="act-info">
                  <span>Breakfast</span>
                  <span className="act-time">8:10 AM · 1 cup</span>
                </div>
                <span className="act-check">✓</span>
              </div>
              <div className="mock-activity pending">
                <span className="act-icon">💊</span>
                <div className="act-info">
                  <span>Heartworm pill</span>
                  <span className="act-time">Due by 6:00 PM</span>
                </div>
                <span className="act-pending">!</span>
              </div>
            </div>
            <div className="mock-ai-bubble">
              <span className="ai-icon">✦</span>
              <span>Biscuit's next vet check is in 3 weeks.</span>
            </div>
          </div>
        </div>
        <div className="phone-shadow" />
        <div className="floating-pill pill-1">🐾 Walk logged</div>
        <div className="floating-pill pill-2">💊 Meds on track</div>
        <div className="floating-pill pill-3">👨‍👩‍👧 Family shared</div>
      </div>
    </section>
  );
}
