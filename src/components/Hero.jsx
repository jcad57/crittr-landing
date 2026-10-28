import {
  Heart as HeartIcon,
  PawPrint,
  Sparkles,
  Users,
  ArrowRight,
} from "lucide-react";
import dashboardScreenshot from "../assets/dashboard.png";
import heroPets from "../assets/images/hero-pets-rounded.webp";
import StoreBadges from "./StoreBadges";
import { Heart, Burst, CurvedArrow } from "./Doodles";
import "./Hero.css";
const benefits = [
  {
    icon: PawPrint,
    text: (
      <>
        3 pets included,
        <br />
        upgrade for more
      </>
    ),
  },
  {
    icon: HeartIcon,
    text: (
      <>
        Never miss
        <br />
        a medication
      </>
    ),
  },
  {
    icon: Users,
    text: (
      <>
        Co-care together
        <br />
        with anyone
      </>
    ),
  },
  {
    icon: Sparkles,
    text: ( 
      <>
        Get personalized
        <br />
        help with Crittr AI
      </>
    ),
  },
];
export default function Hero() {
  return (
    <>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-title">
            Every pet,
            <br />
            <span className="underlined">simply cared for.</span>
          </h1>
          <p className="hero-subtitle">
            Meals, meds, walks, vet visits and all the little things. Keep every
            part of pet care organized with Crittr.
          </p>
          <StoreBadges />
          <div className="hero-actions">
            <a href="#how-it-works">
              See how it works <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-peach-blob" />
          <Heart className="hero-heart" />
          <Burst className="hero-burst" />
          <CurvedArrow className="hero-arrow" />
          <img
            className="hero-pets"
            src={heroPets}
            width="1200"
            height="900"
            alt="A happy golden retriever cuddled up with a content tabby cat"
            fetchPriority="high"
          />
          <div className="hero-phone">
            <img
              src={dashboardScreenshot}
              alt="Crittr app dashboard with pet profiles, daily care progress, meals, walks, and medications"
              width="1206"
              height="2622"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>
      <div className="benefits-bar">
        <div className="benefits-inner container">
          {benefits.map(({ icon: Icon, text }, i) => (
            <div className="benefit" key={i}>
              <span className="benefit-icon">
                <Icon aria-hidden="true" />
              </span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
