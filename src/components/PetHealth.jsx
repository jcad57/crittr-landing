import { Link } from "react-router-dom";
import { ArrowRight, FileHeart, Pill, Syringe } from "lucide-react";
import { signupHref } from "../lib/signupIntent";
import HealthHubDemo from "./HealthHubDemo";
import "./PetHealth.css";

export default function PetHealth() {
  return (
    <section
      className="pet-health"
      id="pet-health"
      aria-labelledby="health-title"
    >
      <div className="health-inner container">
        <div className="health-copy">
          <p className="section-label">Health & medical records</p>
          <h2 className="section-title" id="health-title">
            We simplify
            <br />
            <span className="underlined">complex care.</span>
          </h2>
          <p className="section-sub">
            No matter how simple or complex your pet's medical needs are, with Crittr you can create an organized plan and get notified when health related events are due.
          </p>
          <ul className="health-benefits">
            <li>
              <span className="health-benefit-icon">
                <Pill aria-hidden="true" />
              </span>
              <div>
                <h3>A schedule for the tricky stuff</h3>
                <p>
                  Set each dose and time, from simple to complex treatments.
                  See what's been given and what's coming up.
                </p>
              </div>
            </li>
            <li>
              <span className="health-benefit-icon">
                <Syringe aria-hidden="true" />
              </span>
              <div>
                <h3>Stay a step ahead of vaccinations</h3>
                <p>
                  Missing a vaccination could mean a big problem. Crittr will keep you on top of it with push notifications.
                </p>
              </div>
            </li>
            <li>
              <span className="health-benefit-icon">
                <FileHeart aria-hidden="true" />
              </span>
              <div>
                <h3>
                  Less paper. More peace of mind.{" "}
                </h3>
                <p>
                  Snap a photo or upload PDFs, keep files together in named
                  records, and share them with your vet.
                </p>
              </div>
            </li>
          </ul>
          <Link to={signupHref("pro")} className="btn-primary">
            Make care feel simpler <ArrowRight aria-hidden="true" />
          </Link>
          <p className="health-plan-note">
            Health tracking is free. Uploads come with Pro.
          </p>
        </div>

        <div className="health-visual">
          <HealthHubDemo />
        </div>
      </div>
    </section>
  );
}
