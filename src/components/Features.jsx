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
    href: "#how-it-works",
  },
  {
    title: "Get notified when it's time",
    desc: "Store all your pet's medical information in your pet's profile and Crittr will send you a reminder when it's time to give your pet their medication, upcoming vaccinations, and vet visits.",
    image: cat,
    alt: "Playful tabby cat lying on its back with four paws in the air",
    color: "lavender",
    category: "Health & records",
    href: "#pet-health",
  },
  {
    title: "Sharing is caring",
    desc: "No need to write an essay about your pet's daily routine. Keep everyone in the loop with Crittr's co-care sharing feature. From family to trusted sitters, everyone stays in sync.",
    image: together,
    alt: "A woman gently kissing a tricolor Cavalier King Charles Spaniel",
    color: "peach",
    category: "Care together",
    href: "#cocare",
    pro: false,
  },
];
const moreFeatures = [
  {
    icon: ClipboardList,
    title: "Activity Logging",
    desc: "Log walks, meals, treats, medications, and vet visits with ease. Review history and edit past entries anytime.",
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
      id="how-it-works"
      aria-labelledby="features-title"
    >
      <div className="section-heading">
        <p className="section-label">What Crittr does</p>
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
