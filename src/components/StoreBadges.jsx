import { Link } from "react-router-dom";
import { signupHref } from "../lib/signupIntent";
import appStoreBadge from "../assets/badges/app-store.svg";
import googlePlayBadge from "../assets/badges/google-play.svg";
export default function StoreBadges() {
  return (
    <div className="store-badges">
      <Link
        className="store-option"
        to={signupHref()}
        aria-label="Create your Crittr account and download on the App Store"
      >
        <img
          src={appStoreBadge}
          alt="Download on the App Store"
          width="182"
          height="60"
        />
      </Link>
      <div className="store-option">
        <img
          src={googlePlayBadge}
          alt="Get it on Google Play — coming soon"
          width="182"
          height="60"
        />
        <span className="store-coming-soon">Coming soon on Android</span>
      </div>
    </div>
  );
}
