import { useState } from "react";
import {
  BatteryFull,
  Check,
  Ellipsis,
  Pill,
  PawPrint,
  Signal,
  Users,
  Wifi,
} from "lucide-react";
import together from "../assets/images/care-together.webp";
import walkIcon from "../assets/icons/walk-dog-icon.png";
import foodIcon from "../assets/icons/food-icon.png";
import medicineIcon from "../assets/icons/medicine-icon.png";
import { Heart, Burst, CurvedArrow } from "./Doodles";
import "./DailyCare.css";

// Assets match the native app's ScheduleActivityCard and activityRowIcons mapping.
const tasks = [
  { name: "Morning walk", time: "8:00 AM", icon: walkIcon, color: "teal" },
  { name: "Breakfast", time: "8:30 AM", icon: foodIcon, color: "lavender" },
  { name: "Evening meds", time: "7:00 PM", icon: medicineIcon, color: "cream" },
];
export default function DailyCare() {
  const [completedAt, setCompletedAt] = useState([
    tasks[0].time,
    tasks[1].time,
    null,
  ]);
  const completed = completedAt.map(Boolean);
  function toggle(index) {
    const time = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    setCompletedAt((previous) =>
      previous.map((value, i) => (i === index ? (value ? null : time) : value)),
    );
  }
  return (
    <section
      className="daily-care"
      aria-labelledby="daily-title"
    >
      <div className="daily-care-inner container">
        <div className="daily-photo">
          <img
            src={together}
            alt="More time for cuddles: a woman hugging her happy golden retriever"
            width="1200"
            height="1200"
            loading="lazy"
          />
          <div className="handwritten daily-photo-note" aria-hidden="true">
            <span>Good</span>
            <span>Care</span>
            <span>Brighter</span>
            <span>Days</span>
            <Heart />
          </div>
        </div>
        <div className="daily-copy">
          <h2 className="section-title" id="daily-title">
            Have fewer
            <br />
            “Did we ...?"{" "}
            <span className="accent-word">
              moments
              <Burst />
            </span>
          </h2>
          <p className="section-sub">
            Let Crittr turn your pets daily care into a simple, daily routine.
            Check off tasks as you go and stay on top of everything.
          </p>
          <div className="daily-demo">
            <div
              className="care-app-preview"
              aria-label="Crittr app schedule preview"
            >
              <div className="care-app-screen">
                <div className="care-preview-status" aria-hidden="true">
                  <span>9:41</span>
                  <i />
                  <span className="care-preview-status-icons">
                    <Signal />
                    <Wifi />
                    <BatteryFull />
                  </span>
                </div>
                <div
                  className="care-checklist"
                  aria-label="Interactive daily care example"
                >
                  <div className="care-checklist-heading">
                    <strong>Today's care</strong>
                    <span>Tue, Apr 23</span>
                  </div>
                  {tasks.map(({ name, time, icon, color }, index) => (
                    <div
                      className={`care-task${completed[index] ? " is-complete" : ""}`}
                      key={name}
                    >
                      {completedAt[index] && (
                        <span className="care-completed-time" aria-hidden="true">
                          {completedAt[index]}
                        </span>
                      )}
                      <span
                        className={`care-task-icon task-${color}`}
                        aria-hidden="true"
                      >
                        <span
                          className="care-task-symbol"
                          style={{ "--activity-icon": `url("${icon}")` }}
                        />
                      </span>
                      <span className="care-task-label">
                        <strong>{name}</strong>
                        <span>{time}</span>
                      </span>
                      <span className="care-task-actions">
                        <button
                          className={`task-check${completed[index] ? " is-done" : ""}`}
                          type="button"
                          aria-pressed={completed[index]}
                          aria-label={`${name}, ${completed[index] ? "completed" : "not completed"}`}
                          onClick={() => toggle(index)}
                        >
                          <Check size={18} strokeWidth={2.8} aria-hidden="true" />
                        </button>
                        <span className="care-task-menu" aria-hidden="true">
                          <Ellipsis size={22} />
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="daily-demo-note" aria-hidden="true">
              <CurvedArrow />
              <span className="handwritten">
                <span>Stay on track</span>
                <span>all day long</span>
                <Heart />
              </span>
            </div>
          </div>
          <div className="care-statuses">
            <span>
              <PawPrint aria-hidden="true" />
              Walk logged
            </span>
            <span>
              <Pill aria-hidden="true" />
              Meds on track
            </span>
            <span>
              <Users aria-hidden="true" />
              Shared with Mom
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
