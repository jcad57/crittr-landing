import { useState } from "react";
import { Link } from "react-router-dom";
import { signupHref } from "../lib/signupIntent";
import {
  ArrowRight,
  BatteryFull,
  Bell,
  Check,
  Signal,
  Wifi,
} from "lucide-react";
import { PetProfileScreen, PermissionsScreen } from "./CoCareScreens";
import { Heart, Burst } from "./Doodles";
import "./CoCare.css";

function PhoneStatus() {
  return (
    <div className="preview-status" aria-hidden="true">
      <span>9:41</span>
      <i />
      <span className="preview-status-icons">
        <Signal />
        <Wifi />
        <BatteryFull />
      </span>
    </div>
  );
}

function AppPhone({ id, className, label, selected, children }) {
  return (
    <div
      id={id}
      className={`preview-phone ${className}${selected ? " is-selected" : ""}`}
    >
      <PhoneStatus />
      <div className="preview-phone-screen" role="group" aria-label={label}>
        {children}
      </div>
      <div className="preview-home-indicator" aria-hidden="true" />
    </div>
  );
}

export default function CoCare() {
  const [activePreview, setActivePreview] = useState("profile");

  return (
    <section className="cocare" id="why-crittr" aria-labelledby="cocare-title">
      <div className="cocare-inner container">
        <div className="cocare-text" id="cocare">
          <h2 className="section-title" id="cocare-title">
            Care is better
            <br />
            <span className="accent-word">
              together.
              <Heart />
            </span>
          </h2>
          <p className="section-sub">
            Invite family members, partners, or trusted sitters by email. Set
            exactly what they can see and do — from full access to log-only.
            Crittr keeps everyone in sync.
          </p>
          <ul className="cocare-list">
            {[
              "1 co-carer per pet on Free",
              "Unlimited co-carers with Pro",
              "Get notified when someone completes a task",
              "Unique permission controls per person",
              "Schedules are synced automatically",
            ].map((item) => (
              <li key={item}>
                <Check size={17} strokeWidth={2.6} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="cocare-plan-note">
            The pet owner’s plan sets the limit. Co-carers can join on Free.
          </p>
          <Link to={signupHref()} className="btn-primary">
            Let's get started <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div
          className="cocare-visual"
          role="group"
          aria-label="Crittr app previews: pet profile followed by co-care permissions"
        >
          <div
            className="cocare-preview-picker"
            role="group"
            aria-label="Choose an app preview"
          >
            <button
              type="button"
              aria-pressed={activePreview === "profile"}
              aria-controls="cocare-profile-phone"
              onClick={() => setActivePreview("profile")}
            >
              Pet profile
            </button>
            <button
              type="button"
              aria-pressed={activePreview === "permissions"}
              aria-controls="cocare-permissions-phone"
              onClick={() => setActivePreview("permissions")}
            >
              Permissions
            </button>
          </div>
          <AppPhone
            id="cocare-profile-phone"
            className="pets-phone"
            label="Crittr pet profile for Roxy"
            selected={activePreview === "profile"}
          >
            <PetProfileScreen />
          </AppPhone>
          <AppPhone
            id="cocare-permissions-phone"
            className="sharing-phone"
            label="Crittr co-care permissions for Ashley Dawson"
            selected={activePreview === "permissions"}
          >
            <PermissionsScreen />
          </AppPhone>
          {/* <div className="cocare-notif">
            <span className="notif-icon">
              <Bell size={18} aria-hidden="true" />
            </span>
            <span>Ashley completed Roxy's evening meds</span>
            <span className="notif-check">
              <Check size={14} aria-hidden="true" />
            </span>
          </div> */}
          <Burst className="cocare-burst" />
          <div className="handwritten cocare-note" aria-hidden="true">
            We
            <br />
            got
            <br />
            this.
            <br />
            <Heart />
          </div>
        </div>
      </div>
    </section>
  );
}
