import "./Pricing.css";

const free = [
  "Full profile for 1 pet",
  "Unlimited activity logging",
  "Health hub (meds, vaccines, weight)",
  "Vet visit tracking",
  "Dashboard & history",
];

const pro = [
  "Unlimited pets",
  "Co-care sharing & permissions",
  "Medical record attachments",
  "CrittrAI pet assistant",
  "Push notifications & reminders",
  "Priority support",
];

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="pricing-inner">
        <div className="section-label">Simple pricing</div>
        <h2 className="section-title">
          Start free,
          <br />
          <em>upgrade when ready.</em>
        </h2>
        <p className="section-sub">
          No credit card to get started. Crittr Pro is billed through Stripe —
          cancel anytime.
        </p>

        <div className="pricing-cards">
          <div className="pricing-card free-card">
            <div className="plan-name">Free</div>
            <div className="plan-price">
              <span className="price-amount">$0</span>
              <span className="price-period">forever</span>
            </div>
            <p className="plan-desc">
              Everything you need to get one pet fully set up and cared for.
            </p>
            <ul className="plan-features">
              {free.map((f) => (
                <li key={f}>
                  <span className="feat-check free-check">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#" className="plan-btn free-btn">
              Download the App
            </a>
          </div>

          <div className="pricing-card pro-card">
            <div className="pro-ribbon">Most Popular</div>
            <div className="plan-name">Crittr Pro</div>
            <div className="plan-price">
              <span className="price-amount">$4.99</span>
              <span className="price-period">/ month</span>
            </div>
            <p className="plan-desc">
              Unlimited pets, shared care, AI help, and peace of mind reminders.
            </p>
            <ul className="plan-features">
              {pro.map((f) => (
                <li key={f}>
                  <span className="feat-check pro-check">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#" className="plan-btn pro-btn">
              Start Free Trial
            </a>
            <p className="plan-note">7-day free trial · Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
}
