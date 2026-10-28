export function Heart({ className = "" }) {
  return (
    <svg
      className={`doodle doodle-heart ${className}`}
      viewBox="0 0 40 46"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 38C15 31 3 19 5 11c2-8 11-8 15 1C22-3 36 2 34 14c-1 8-8 18-14 24Z"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Burst({ className = "" }) {
  return (
    <svg
      className={`doodle doodle-burst ${className}`}
      viewBox="0 0 52 60"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m12 19 5-15M25 30l20-12M29 44l17 4"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function CurvedArrow({ className = "" }) {
  return (
    <svg
      className={`doodle doodle-arrow ${className}`}
      viewBox="0 0 80 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M25 5C4 45 25 74 62 77M48 62l16 16-21 8"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
