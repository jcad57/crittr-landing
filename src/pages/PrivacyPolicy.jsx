import { useEffect } from "react";
import { Link } from "react-router-dom";
import { privacyPolicySections } from "../data/privacyPolicy";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy policy — Crittr";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="privacy" id="main-content">
      <div className="privacy-inner">
        <p className="privacy-eyebrow">Legal</p>
        <h1 className="privacy-title">Privacy policy</h1>
        <aside className="legal-callout" aria-label="Account and data deletion">
          <p>
            Want to delete your Crittr account and associated data?{" "}
            <Link to="/delete-account">Request account deletion</Link>, including
            if you cannot access the app.
          </p>
        </aside>
        <div className="privacy-sections">
          {privacyPolicySections.map((section) => (
            <section key={section.title} className="privacy-section">
              <h2 className="privacy-section-title">{section.title}</h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="privacy-section-p">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
