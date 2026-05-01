import { useEffect } from "react";
import { privacyPolicySections } from "../data/privacyPolicy";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="privacy">
      <div className="privacy-inner">
        <p className="privacy-eyebrow">Legal</p>
        <h1 className="privacy-title">Privacy policy</h1>
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
