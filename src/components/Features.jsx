import "./Features.css";

const features = [
  {
    icon: "🐾",
    title: "Detailed Pet Profiles",
    desc: "Name, breed, photos, food preferences, vet clinic, microchip, insurance — everything about your pet in one place.",
  },
  {
    icon: "📋",
    title: "Activity Logging",
    desc: "Log walks, meals, treats, medications, and vet visits with ease. Review history and edit past entries anytime.",
  },
  {
    icon: "💊",
    title: "Health Hub",
    desc: "Track medications, vaccination schedules, and upcoming vet visits so nothing slips through the cracks.",
  },
  {
    icon: "✦",
    title: "CrittrAI Assistant",
    desc: "Ask questions grounded in your pet's actual data — not generic web results. Real answers for your real animals.",
    pro: true,
  },
  {
    icon: "👥",
    title: "Co-Care Sharing",
    desc: "Invite family members or sitters by email with fine-grained permission controls. Everyone stays in sync.",
    pro: true,
  },
  {
    icon: "🔔",
    title: "Smart Reminders",
    desc: "Push notifications for medications, vet visits, and care schedules. Because memory isn't a care plan.",
    pro: true,
  },
];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="features-inner">
        <div className="section-label">What Crittr does</div>
        <h2 className="section-title">
          Every tool a pet parent
          <br />
          <em>actually needs</em>
        </h2>
        <p className="section-sub">
          Built around each pet's profile — a calm, organized home for
          everything about the animal you love.
        </p>

        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-content">
                <div className="feature-title-row">
                  <h3>{f.title}</h3>
                  {f.pro && <span className="pro-badge">Pro</span>}
                </div>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
