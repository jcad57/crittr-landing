import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  DELETION_REQUEST_HREF,
  DELETION_REQUEST_SUBJECT,
  DELETION_SUPPORT_EMAIL,
} from "../data/accountDeletion";
import "./PrivacyPolicy.css";

export default function DeleteAccount() {
  useEffect(() => {
    document.title = "Delete your account — Crittr";
  }, []);

  return (
    <main className="privacy" id="main-content">
      <div className="privacy-inner">
        <p className="privacy-eyebrow">Your account & data</p>
        <h1 className="privacy-title">Delete your Crittr account</h1>

        <div className="legal-callout deletion-request" aria-labelledby="deletion-request-title">
          <h2 className="privacy-section-title" id="deletion-request-title">Request deletion by email</h2>
          <p className="privacy-section-p">
            You can request deletion of your Crittr account and associated data
            without installing the app or signing in to this website.
          </p>
          <a className="deletion-request-button" href={DELETION_REQUEST_HREF}>
            Email an account deletion request
          </a>
          <p className="deletion-request-note">
            This opens your email app. Send the email to submit your request;
            opening it does not delete your account.
          </p>
          <p className="privacy-section-p deletion-email-fallback">
            Prefer webmail? Email <a href={`mailto:${DELETION_SUPPORT_EMAIL}`}>{DELETION_SUPPORT_EMAIL}</a>{" "}
            with the subject “{DELETION_REQUEST_SUBJECT}”. Include the email
            address used for your Crittr account, ideally sending from that address.
            We may need to verify account ownership before acting on your request.
          </p>
          <p className="privacy-section-p">
            Do not send your password, sign-in codes or payment card details.
          </p>
        </div>

        <div className="privacy-sections">
          <section className="privacy-section">
            <h2 className="privacy-section-title">What the request covers</h2>
            <p className="privacy-section-p">
              Deleting your account removes your Crittr profile, pets you own and
              their associated care history, your account chat history, and your
              access to shared pets. Owned pet data includes the pet profiles,
              saved care and health records, and attached files associated with those pets.
            </p>
            <p className="privacy-section-p">
              Co-carers keep their own accounts. Deleting your account does not
              delete pets owned by another person. Copies you have shared with
              another app or recipient are outside Crittr’s control.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">What may be retained</h2>
            <p className="privacy-section-p">
              Copies in backups and records retained for security, legal obligations,
              dispute resolution or enforcement of our terms may remain after
              deletion. Deletion may take time to propagate across backups.
            </p>
            <p className="privacy-section-p">
              Store transaction records and information independently retained by
              providers are governed by their retention requirements. See our{" "}
              <Link to="/privacy">Privacy policy</Link> for how Crittr and its providers process information.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Cancel your subscription separately</h2>
            <p className="privacy-section-p">
              Deleting your Crittr account does not cancel an App Store or Google
              Play subscription. Manage or cancel your subscription through the
              store that bills you to stop future renewals.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">You can also delete in the app</h2>
            <p className="privacy-section-p">
              If you have access to Crittr, go to Profile → Settings → Delete account.
              The email request above is available if you cannot access the app.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
