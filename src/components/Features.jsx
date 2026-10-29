import { ArrowRight, BellRing, ClipboardList, Sparkles } from "lucide-react";
import dog from "../assets/images/daily-routines.webp";
import cat from "../assets/images/playful-tabby.webp";
import together from "../assets/images/care-together-card.webp";
import { Heart, Burst } from "./Doodles";
import "./Features.css";
const photoFeatures = [
  {
    title: "Let Crittr work for you",
    desc: "From complex to simple pet needs, Crittr turns your pet's profile into an organized schedule that you can quickly check off throughout the day.",
    image: dog,
    alt: "Golden retriever enjoying a meal from a speckled ceramic bowl",
    color: "sage",
    category: "Daily routines",
    href: "#schedule",
  },
  {
    title: "Get notified when it's time",
    desc: "Track medications, vaccinations, and vet visits on Free, with reminders to help you stay on schedule. Medical record storage and uploads come with Pro.",
    image: cat,
    alt: "Playful tabby cat lying on its back with four paws in the air",
    color: "lavender",
    category: "Health & records",
    href: "#pet-health",
  },
  {
    title: "Sharing is caring",
    desc: "No need to write an essay about your pet's daily routine. Share it with 1 co-carer per pet on Free, or unlimited co-carers with Pro, so they can check off tasks as they go.",
    image: together,
    alt: "A woman gently kissing a tricolor Cavalier King Charles Spaniel",
    color: "peach",
    category: "Co-care",
    href: "#cocare",
    pro: false,
  },
];
const moreFeatures = [
  {
    icon: ClipboardList,
    title: "Activity Logging",
    desc: "Log unlimited walks, meals, treats, medications, and vet visits on Free. Review history and edit past entries anytime.",
  },
  {
    icon: BellRing,
    title: "Reminders & Notifications",
    desc: "Get notified when it's time to feed, give medications, or take your pet to the vet.",
  },
  {
    icon: Sparkles,
    title: "CrittrAI Assistant",
    desc: "Ask questions grounded in your pet's actual data — not generic web results. Tailored answers just for you and your pet.",
    pro: true,
  },
];
export default function Features() {
  return (
    <section
      className="features container"
      id="features"
      aria-labelledby="features-title"
    >
      <div className="section-heading">
        <h2 className="section-title" id="features-title">
          Every tool a pet parent
          <br className="features-title-break" /> actually{" "}
          <span className="accent-word">
            needs.
            <Burst />
          </span>
        </h2>
        <p className="section-sub">
          Built around each pet's profile — Crittr keeps you organized with a simple schedule and notifications.
        </p>
      </div>
      <div className="features-grid">
        {photoFeatures.map((feature) => (
          <article
            className={`feature-card feature-${feature.color}`}
            key={feature.title}
          >
            <div className="feature-photo">
              <img
                src={feature.image}
                alt={feature.alt}
                width="1200"
                height="900"
                loading="lazy"
              />
              {feature.color === "sage" ? <Burst /> : <Heart />}
            </div>
            <div className="feature-content">
              <div className="feature-category">{feature.category}</div>
              <div className="feature-title-row">
                <h3>{feature.title}</h3>
                {feature.pro && <span className="pro-badge">Pro</span>}
              </div>
              <p>{feature.desc}</p>
              <a
                className="feature-arrow"
                href={feature.href}
                aria-label={`Learn about ${feature.title}`}
              >
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="more-features">
        {moreFeatures.map(({ icon: Icon, title, desc, pro }) => (
          <article className="small-feature" key={title}>
            <span className="small-feature-icon">
              <Icon size={23} aria-hidden="true" />
            </span>
            <div>
              <div className="feature-title-row">
                <h3>{title}</h3>
                {pro && <span className="pro-badge">Pro</span>}
              </div>
              <p>{desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
