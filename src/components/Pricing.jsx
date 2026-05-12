import { useState } from "react";
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

const PRO_MONTHLY = 4.99;
const PRO_ANNUAL = 39.99;
const proAnnualMonthlyEquiv = (PRO_ANNUAL / 12).toFixed(2);
const proAnnualSavingsYear = (PRO_MONTHLY * 12 - PRO_ANNUAL).toFixed(2);

export default function Pricing() {
  const [proBilling, setProBilling] = useState("annual");

  return (
    <section className="pricing" id="pricing">
      <div className="pricing-inner">
        <div className="section-label">Simple pricing</div>
        <h2 className="section-title">
          Start free,
          <br />
          <em>upgrade when ready.</em>
        </h2>
        <p className="section-sub">No credit card to get started.</p>

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
            <div className="pro-billing">
              <div
                className="pro-billing-tabs"
                role="tablist"
                aria-label="Crittr Pro billing period"
              >
                <button
                  type="button"
                  role="tab"
                  id="pro-tab-annual"
                  aria-controls="pro-panel-billing"
                  aria-selected={proBilling === "annual"}
                  className={`pro-billing-tab${proBilling === "annual" ? " is-active" : ""}`}
                  onClick={() => setProBilling("annual")}
                >
                  Annual
                  <span className="pro-billing-tab-hint">Best value</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  id="pro-tab-monthly"
                  aria-controls="pro-panel-billing"
                  aria-selected={proBilling === "monthly"}
                  className={`pro-billing-tab${proBilling === "monthly" ? " is-active" : ""}`}
                  onClick={() => setProBilling("monthly")}
                >
                  Monthly
                </button>
              </div>
              <div
                id="pro-panel-billing"
                role="tabpanel"
                aria-labelledby={
                  proBilling === "annual" ? "pro-tab-annual" : "pro-tab-monthly"
                }
                className="pro-billing-panel"
              >
                {proBilling === "annual" ? (
                  <>
                    <div className="plan-price">
                      <span className="price-amount">${PRO_ANNUAL.toFixed(2)}</span>
                      <span className="price-period">/ year</span>
                    </div>
                    <p className="price-savings-line">
                      {`~$${proAnnualMonthlyEquiv}/mo billed annually · Save $${proAnnualSavingsYear}/year vs paying monthly`}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="plan-price">
                      <span className="price-amount">${PRO_MONTHLY.toFixed(2)}</span>
                      <span className="price-period">/ month</span>
                    </div>
                    <p className="price-savings-line price-savings-line-muted">
                      {`Billed monthly · Switch to annual to save $${proAnnualSavingsYear}/year (~$${proAnnualMonthlyEquiv}/mo equivalent)`}
                    </p>
                  </>
                )}
              </div>
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
