import { useEffect } from "react";
import { termsOfServiceSections } from "../data/termsOfService";
import "./PrivacyPolicy.css";

export default function TermsOfService() {
  useEffect(() => {
    document.title = "Terms of Service — Crittr";
  }, []);
  return (
    <main className="privacy" id="main-content">
      <div className="privacy-inner">
        <p className="privacy-eyebrow">Legal</p>
        <h1 className="privacy-title">Terms of Service</h1>
        <div className="privacy-sections">
          {termsOfServiceSections.map((section) => (
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
