import { useRef, useState } from "react";
import {
  BatteryFull,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Dog,
  FileText,
  HeartPulse,
  House,
  PawPrint,
  Pill,
  Signal,
  Wifi,
} from "lucide-react";
import petProfile from "../assets/images/app-pet-profile.jpg";
import medicalRecordsIcon from "../assets/icons/medical-records-icon.png";
import microchipIcon from "../assets/icons/microchip-icon.png";
import "./HealthHubDemo.css";

// Mirrors the native Health screen, HealthActionBanner, MedicationListRow,
// HealthTrafficBadge, and RecordsNavCard. All changes stay in this example.
const medications = [
  {
    id: "daily",
    name: "Daily medication",
    frequency: "Daily",
    dosage: "1 Tablet",
    times: ["8:00 AM", "8:00 PM"],
    total: 2,
    initial: 1,
  },
  {
    id: "drops",
    name: "Eye drops",
    frequency: "Every other day",
    dosage: "1 Drop",
    times: ["12:00 PM"],
    total: 1,
    initial: 0,
  },
];

function PetAvatar() {
  return (
    <span
      className="hub-pet-avatar"
      style={{ backgroundImage: `url(${petProfile})` }}
      role="img"
      aria-label="Roxy, the example pet"
    />
  );
}

function SectionHeading({ children, add = false }) {
  return (
    <div className="hub-section-heading">
      <h4>{children}</h4>
      {add && <span aria-hidden="true">Add</span>}
    </div>
  );
}

function HealthRow({ icon: Icon, image, title, subtitle, badge, tone, onClick }) {
  const content = (
    <>
      <span className={`hub-row-icon hub-icon-${tone}`}>
        {image ? <img src={image} alt="" /> : <Icon aria-hidden="true" />}
      </span>
      <span className="hub-row-copy">
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </span>
      {badge && (
        <span className={`hub-badge hub-badge-${badge.kind}`}>{badge.label}</span>
      )}
      <ChevronRight className="hub-chevron" aria-hidden="true" />
    </>
  );

  return (
    <li>
      {onClick ? (
        <button className="hub-row" type="button" data-title={title} onClick={onClick}>
          {content}
        </button>
      ) : (
        <div className="hub-row">{content}</div>
      )}
    </li>
  );
}

function DetailFields({ fields }) {
  return (
    <dl className="hub-detail-fields">
      {fields.map(([label, value]) => (
        <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
      ))}
    </dl>
  );
}

export default function HealthHubDemo() {
  const [progress, setProgress] = useState({ daily: 1, drops: 0 });
  const [screen, setScreen] = useState("health");
  const scrollArea = useRef(null);
  const backButton = useRef(null);
  const screenHistory = useRef([]);
  const dueMedications = medications.filter((med) => progress[med.id] < med.total);
  const activeMedication = medications.find((med) => med.id === screen);

  function openScreen(nextScreen, event) {
    screenHistory.current.push({
      screen,
      scrollTop: scrollArea.current?.scrollTop ?? 0,
      triggerTitle: event.currentTarget.getAttribute("data-title"),
    });
    setScreen(nextScreen);
    scrollArea.current?.scrollTo({ top: 0 });
    // Focus the new screen's back control once React has rendered it.
    requestAnimationFrame(() => backButton.current?.focus({ preventScroll: true }));
  }

  function goBack() {
    const previous = screenHistory.current.pop() ?? { screen: "health", scrollTop: 0 };
    setScreen(previous.screen);
    requestAnimationFrame(() => {
      scrollArea.current?.scrollTo({ top: previous.scrollTop });
      const trigger = [...(scrollArea.current?.querySelectorAll("button[data-title]") ?? [])]
        .find((button) => button.getAttribute("data-title") === previous.triggerTitle);
      (trigger ?? scrollArea.current)?.focus({ preventScroll: true });
    });
  }

  function markDone() {
    const next = dueMedications[0];
    if (next) setProgress((previous) => ({ ...previous, [next.id]: previous[next.id] + 1 }));
  }

  const title = screen === "health" ? "Health"
    : screen === "records" ? "Medical Records"
    : screen === "record" ? "Medical record"
    : activeMedication ? "Medication details"
    : screen === "microchip" ? "Microchip details"
    : screen === "visit" ? "Vet visit details"
    : "Vaccination details";

  return (
    <div className="health-hub-demo">
      <div className="hub-phone" role="group" aria-label="Interactive example of the Crittr Health hub">
        <div className="hub-status" aria-hidden="true">
          <span>9:41</span><i />
          <span><Signal /><Wifi /><BatteryFull /></span>
        </div>
        <div className="hub-screen">
          <div className="hub-scroll" ref={scrollArea} tabIndex={0} role="region" aria-label={`${title} demo screen`}>
            <div className={`hub-header${screen !== "health" ? " hub-header-detail" : ""}`}>
              {screen !== "health" && (
                <button type="button" ref={backButton} onClick={goBack} aria-label={screen === "record" ? "Back to Medical Records" : "Back to Health hub"}><ChevronLeft aria-hidden="true" /></button>
              )}
              <div>
                <h3>{title}</h3>
                {screen === "health" && <p>Roxy · Updated October 28, 2026</p>}
              </div>
              <PetAvatar />
            </div>

            {screen === "health" && (
              <>
                <div aria-live="polite" aria-atomic="true">
                  {dueMedications.length > 0 ? (
                    <div className="hub-action-banner">
                      <CircleAlert aria-hidden="true" />
                      <div><strong>{dueMedications.length} {dueMedications.length === 1 ? "action" : "actions"} needed</strong><p>Roxy's {dueMedications[0].name} dose is due today</p></div>
                      <button type="button" onClick={markDone}>Mark done</button>
                    </div>
                  ) : <span className="hub-sr-only">All of today's medication doses are logged.</span>}
                </div>
                <SectionHeading add>Medications</SectionHeading>
                <ul className="hub-list-card">
                  {medications.map((med) => (
                    <HealthRow key={med.id} icon={Pill} tone="orange" title={med.name}
                      subtitle={`Roxy · ${med.frequency} · ${med.dosage}`}
                      badge={{label:`${progress[med.id]}/${med.total}`,kind:progress[med.id] === med.total ? "current" : "today"}}
                      onClick={(event) => openScreen(med.id, event)} />
                  ))}
                </ul>
                <SectionHeading add>Vaccinations</SectionHeading>
                <ul className="hub-list-card">
                  <HealthRow icon={CircleAlert} tone="amber" title="Rabies" subtitle="Roxy · Annually · Exp. Nov 2026" badge={{label:"Exp. soon",kind:"soon"}} onClick={(event) => openScreen("rabies", event)} />
                  <HealthRow icon={CheckCircle2} tone="mint" title="DHPP" subtitle="Roxy · Every 3 years · Exp. Jun 2027" badge={{label:"Current",kind:"current"}} onClick={(event) => openScreen("dhpp", event)} />
                </ul>
                <SectionHeading add>Upcoming visits</SectionHeading>
                <ul className="hub-list-card">
                  <HealthRow icon={CalendarClock} tone="lavender" title="Annual checkup" subtitle={<>Roxy · Wed, Nov 4, 10:00 AM<br />Austin Pet And Bird Clinic</>} onClick={(event) => openScreen("visit", event)} />
                </ul>
                <SectionHeading>Records</SectionHeading>
                <ul className="hub-list-card">
                  <HealthRow image={microchipIcon} tone="sky" title="Microchip details" subtitle="Registry and ID" onClick={(event) => openScreen("microchip", event)} />
                  <HealthRow image={medicalRecordsIcon} tone="orange" title="Medical Records" subtitle="Visit notes and your uploads" onClick={(event) => openScreen("records", event)} />
                </ul>
              </>
            )}

            {activeMedication && <DetailFields fields={[
              ["Name", activeMedication.name],
              ...activeMedication.times.map((time) => [time, activeMedication.dosage]),
              ["How often", activeMedication.frequency],
              ["Condition", "—"], ["Notes", "—"],
              ["Last given", progress[activeMedication.id] > 0 ? "October 28, 2026" : "October 26, 2026"],
            ]} />}
            {(screen === "rabies" || screen === "dhpp") && <DetailFields fields={[
              ["Name", screen === "rabies" ? "Rabies" : "DHPP"],
              ["Date administered", screen === "rabies" ? "November 4, 2025" : "June 12, 2024"],
              ["Expires", screen === "rabies" ? "November 4, 2026" : "June 12, 2027"],
              ["Administered by", "Austin Pet And Bird Clinic"], ["Lot number", "—"], ["Notes", "—"],
            ]} />}
            {screen === "visit" && <DetailFields fields={[
              ["Title", "Annual checkup"], ["Date & time", "November 4, 2026 · 10:00 AM"], ["Location", "Austin Pet And Bird Clinic"], ["Notes", "Bring vaccination records."],
            ]} />}
            {screen === "microchip" && <DetailFields fields={[["Registry", "On file"], ["Microchip ID", "Example pet · ID on file"]]} />}
            {screen === "records" && (
              <>
                <p className="hub-records-lead">Upload and store all your pet's important medical documents here. You can also share these documents with your vet.</p>
                <div className="hub-records-label">Your uploads</div>
                <ul className="hub-list-card"><HealthRow icon={FileText} tone="lavender" title="Roxy's annual checkup" subtitle="2 files · Oct 28, 2026" onClick={(event) => openScreen("record", event)} /></ul>
                <div className="hub-records-label">From your vet</div>
                <p className="hub-empty-card">No records from your vet yet.</p>
              </>
            )}
            {screen === "record" && (
              <>
                <DetailFields fields={[["Record name", "Roxy's annual checkup"]]} />
                <div className="hub-records-label">Files</div>
                <ul className="hub-list-card">
                  <HealthRow icon={FileText} tone="lavender" title="Visit summary.pdf" subtitle="PDF document" />
                  <HealthRow icon={FileText} tone="lavender" title="Vaccination certificate.jpg" subtitle="Photo" />
                </ul>
              </>
            )}
          </div>
          {screen === "health" && (
            <div className="hub-bottom-nav" aria-hidden="true">
              {[[House,"Home"],[CalendarDays,"Schedule"],[PawPrint,"Pets"],[HeartPulse,"Health"],[Dog,"CrittrAI"]].map(([Icon,label]) => (
                <span key={label} className={label === "Health" ? "hub-nav-active" : ""}><span><Icon /></span>{label}</span>
              ))}
            </div>
          )}
        </div>
        <div className="hub-home-indicator" aria-hidden="true" />
      </div>
      <div className="hub-demo-caption">
        <p>Example pet · Try “Mark done” or scroll to explore records.</p>
      </div>
    </div>
  );
}
