import { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ClipboardList,
  Drumstick,
  FileHeart,
  Pencil,
  Pill,
  Scale,
  SquarePlus,
  Syringe,
  Venus,
} from "lucide-react";
import petProfileScreenshot from "../assets/images/app-pet-profile.jpg";
import permissionsScreenshot from "../assets/images/app-permissions.jpg";
import "./CoCareScreens.css";

const permissions = [
  {
    name: "Log activities",
    description: "Log exercise, food, medication, and vet visit entries",
    icon: ClipboardList,
  },
  {
    name: "Edit pet profile",
    description: "Change name, breed, details, avatar, and exercise goals",
    icon: Pencil,
  },
  {
    name: "Manage food",
    description: "Add, edit, or remove food and treat entries",
    icon: Drumstick,
  },
  {
    name: "Manage medications",
    description: "Add, edit, or remove medication entries",
    icon: Pill,
  },
  {
    name: "Manage vaccinations",
    description: "Add, edit, or remove vaccination records",
    icon: Syringe,
  },
  {
    name: "Manage vet visits",
    description: "Create, edit, or delete scheduled vet visits",
    icon: SquarePlus,
  },
  {
    name: "Manage medical files",
    description: "Add and manage medical record attachments",
    icon: FileHeart,
  },
];

function ScreenHeader({ children }) {
  return (
    <header className="cocare-screen-header">
      <ChevronLeft aria-hidden="true" />
      <h3>{children}</h3>
    </header>
  );
}

function ProfilePhoto({ person = false }) {
  // Show only the original photo within each reference, never its rasterized UI.
  return (
    <span
      className={`cocare-profile-photo${person ? " carer-photo" : " pet-photo"}`}
      style={{
        backgroundImage: `url(${person ? permissionsScreenshot : petProfileScreenshot})`,
      }}
      role="img"
      aria-label={person ? "Ashley Dawson" : "Roxy, a brown pit bull terrier"}
    />
  );
}

function DetailSection({ title, items }) {
  return (
    <section className="cocare-profile-details">
      <div className="cocare-profile-section-label">
        <h4>{title}</h4>
        <span aria-hidden="true">Edit</span>
      </div>
      <dl>
        {items.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function PetProfileScreen() {
  return (
    <div className="cocare-app-screen pet-profile-screen">
      <div className="cocare-pet-summary">
        <div className="cocare-pet-identity">
          <div className="cocare-pet-avatar">
            <ProfilePhoto />
            <span className="cocare-avatar-edit" aria-hidden="true">
              <Pencil />
            </span>
          </div>
          <div>
            <strong>Roxy</strong>
            <p>Pit Bull Terrier Mix · 6 yr</p>
          </div>
          <Pencil className="cocare-profile-edit" aria-hidden="true" />
        </div>
        <div className="cocare-pet-badges">
          <span>Spayed</span>
          <span>Microchipped</span>
          <span>No insurance</span>
        </div>
      </div>
      <div className="cocare-pet-stats">
        {[
          { label: "Weight", value: "65 lb", icon: Scale },
          { label: "Birthday", value: "—", icon: CalendarDays },
          { label: "Gender", value: "Female", icon: Venus },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label}>
            <Icon aria-hidden="true" />
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <DetailSection
        title="Details"
        items={[
          ["Breed", "Pit Bull Terrier Mix"],
          ["Color", "Brown"],
          ["Vet clinic", "Austin Pet And Bird Clinic"],
          ["Vet address", "403 E Ben White Blvd STE F"],
        ]}
      />
      <DetailSection
        title="Exercise requirements"
        items={[
          ["Energy level", "Medium"],
          ["Evening Walk", "Every day · 7:00 PM"],
        ]}
      />
    </div>
  );
}

export function PermissionsScreen() {
  const [allowed, setAllowed] = useState(() => permissions.map(() => true));

  return (
    <div className="cocare-app-screen permissions-screen">
      <ScreenHeader>Permissions</ScreenHeader>
      <div className="cocare-carer-identity">
        <ProfilePhoto person />
        <div>
          <strong>Ashley Dawson</strong>
          <p>Co-carer for Roxy</p>
        </div>
      </div>
      <h4 className="cocare-permissions-label">Permissions</h4>
      <p className="cocare-permissions-intro">
        Toggle what Ashley Dawson can do. Viewing the pet profile and records is
        always allowed.
      </p>
      <div className="cocare-permissions-list">
        {permissions.map(({ name, description, icon: Icon }, index) => (
          <button
            key={name}
            type="button"
            role="switch"
            aria-checked={allowed[index]}
            aria-label={`${name} permission for Ashley`}
            className="cocare-permission-row"
            onClick={() =>
              setAllowed((previous) =>
                previous.map((value, i) => (i === index ? !value : value)),
              )
            }
          >
            <span className="cocare-permission-icon">
              <Icon aria-hidden="true" />
            </span>
            <span className="cocare-permission-copy">
              <strong>{name}</strong>
              <span>{description}</span>
            </span>
            <span className="cocare-permission-switch" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}
