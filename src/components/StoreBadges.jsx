import { Link } from "react-router-dom";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "../constants/links";
import { signupHref } from "../lib/signupIntent";
import appStoreBadge from "../assets/badges/app-store.svg";
import googlePlayBadge from "../assets/badges/google-play.svg";
export default function StoreBadges({ directDownload = false }) {
  const StoreLink = directDownload ? "a" : Link;
  const linkProps = directDownload
    ? { href: APP_STORE_URL }
    : { to: signupHref() };
  const playStoreUrl = directDownload ? GOOGLE_PLAY_URL : null;
  const PlayStoreLink = playStoreUrl ? "a" : "div";
  return (
    <div className="store-badges">
      <StoreLink
        className="store-option"
        {...linkProps}
        aria-label={
          directDownload
            ? "Download Crittr on the App Store"
            : "Create your Crittr account and download on the App Store"
        }
      >
        <img
          src={appStoreBadge}
          alt="Download on the App Store"
          width="182"
          height="60"
        />
      </StoreLink>
      <PlayStoreLink
        className="store-option"
        href={playStoreUrl || undefined}
      >
        <img
          src={googlePlayBadge}
          alt={
            playStoreUrl
              ? "Get it on Google Play"
              : "Get it on Google Play — coming soon"
          }
          width="182"
          height="60"
        />
        {!playStoreUrl && (
          <span className="store-coming-soon">Coming soon on Android</span>
        )}
      </PlayStoreLink>
    </div>
  );
}
