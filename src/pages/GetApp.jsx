import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowRight,
  Copy,
  Download,
  Heart,
  Smartphone,
} from "lucide-react";
import { APP_STORE_URL } from "../constants/links";
import {
  appStoreUrl,
  detectDevice,
  downloadUrl,
  readSignupChoice,
  signupHref,
} from "../lib/signupIntent";
import { supabase } from "../lib/supabase";
import appStoreBadge from "../assets/badges/app-store.svg";
import googlePlayBadge from "../assets/badges/google-play.svg";

export default function GetApp({ downloadFirst = false }) {
  const [params] = useSearchParams();
  const choice = readSignupChoice(params);
  const device = detectDevice(window.navigator);
  const storeUrl = appStoreUrl(device);
  const [user, setUser] = useState(null);
  const [copyStatus, setCopyStatus] = useState("");
  const url = downloadUrl(downloadFirst ? undefined : choice);
  useEffect(() => {
    if (downloadFirst && storeUrl) window.location.replace(storeUrl);
  }, [downloadFirst, storeUrl]);
  useEffect(() => {
    document.title = "Your next good day starts here — Crittr";
    if (downloadFirst) return;
    let active = true;
    supabase?.auth.getSession().then(({ data }) => {
      if (active) setUser(data.session?.user || null);
    });
    return () => {
      active = false;
    };
  }, [downloadFirst]);
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopyStatus("Link copied. Send it to your phone.");
    } catch {
      setCopyStatus(
        "Copy the link from your browser’s address bar to share it with your phone.",
      );
    }
  }
  return (
    <main className="handoff-layout" id="main-content">
      <section className="handoff-card" aria-labelledby="handoff-heading">
        <span className="handoff-phone-icon">
          <Smartphone size={26} aria-hidden="true" />
        </span>
        <h1 id="handoff-heading">
          {device === "desktop"
            ? "Meet us on your phone"
            : storeUrl
              ? "Your pets. In your pocket."
              : "Android is on its way"}
        </h1>
        <p>
          {device === "desktop"
            ? "Scan this QR code to download Crittr on your phone."
            : device === "ios"
              ? "Crittr is ready for you on the App Store."
              : storeUrl
                ? "Crittr is ready for you on Google Play."
                : downloadFirst
                  ? "Crittr for Android is coming soon. You can sign up in the app when it arrives."
                  : "Your account is ready when you are. Crittr for Android is coming soon."}
        </p>
        {device === "desktop" && (
          <>
            <div className="handoff-qr">
              <QRCodeSVG
                value={url}
                size={184}
                level="M"
                marginSize={4}
                title="Scan to download Crittr on your phone"
              />
            </div>
            {/* <div className="handoff-qr-label">
              <Download size={14} aria-hidden="true" /> Scan. Download. More
              good days.
            </div> */}
            <button
              type="button"
              className="auth-text-button handoff-copy"
              onClick={copyLink}
            >
              <Copy size={15} aria-hidden="true" /> Copy download link
            </button>
            <p className="handoff-copy-status" role="status">
              {copyStatus}
            </p>
          </>
        )}
        {(device !== "android" || storeUrl) && (
          <a
            className="handoff-store"
            href={storeUrl || APP_STORE_URL}
            aria-label={
              device === "android"
                ? "Download Crittr on Google Play"
                : "Download Crittr on the App Store"
            }
          >
            <img
              src={device === "android" ? googlePlayBadge : appStoreBadge}
              width="182"
              height="60"
              alt={
                device === "android"
                  ? "Get it on Google Play"
                  : "Download on the App Store"
              }
            />
          </a>
        )}
        {!appStoreUrl("android") && (
          <p className="handoff-android">
            Android coming soon <Heart size={13} aria-hidden="true" />
          </p>
        )}
        {device !== "desktop" && (
          <a className="btn-primary handoff-open" href="crittr://dashboard">
            Already installed? Open Crittr{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        )}

        <p className="handoff-login">
          {user ? (
            <Link to={signupHref(choice.plan, choice.billing)}>
              Back to your account
            </Link>
          ) : (
            <>
              Need an account?{" "}
              <Link to={signupHref(choice.plan, choice.billing)}>
                Join the crew
              </Link>
            </>
          )}
        </p>
      </section>
    </main>
  );
}
