import { APP_STORE_URL, GOOGLE_PLAY_URL } from "../constants/links.js";

const PENDING_KEY = "crittr-signup-choice";

export function readSignupChoice(search = "") {
  const params = new URLSearchParams(search);
  return {
    plan: params.get("plan") === "pro" ? "pro" : "free",
    billing: params.get("billing") === "monthly" ? "monthly" : "annual",
  };
}

export function choiceQuery(choice) {
  const params = new URLSearchParams({
    plan: choice.plan === "pro" ? "pro" : "free",
  });
  if (choice.plan === "pro")
    params.set("billing", choice.billing === "monthly" ? "monthly" : "annual");
  return params.toString();
}

export function signupHref(plan = "free", billing = "annual") {
  return `/signup?${choiceQuery({ plan, billing })}`;
}

export function rememberChoice(choice) {
  try {
    sessionStorage.setItem(PENDING_KEY, choiceQuery(choice));
  } catch {
    /* private browsing */
  }
}

export function rememberedChoice() {
  try {
    return readSignupChoice(sessionStorage.getItem(PENDING_KEY) || "");
  } catch {
    return readSignupChoice();
  }
}

export function clearRememberedChoice() {
  try {
    sessionStorage.removeItem(PENDING_KEY);
  } catch {
    /* private browsing */
  }
}

// Navigation preference only: this metadata must never authorize paid features.
export function intentMetadata(
  choice,
  id = crypto.randomUUID(),
  now = new Date().toISOString(),
) {
  return {
    signup_source: "website",
    signup_plan: choice.plan === "pro" ? "pro" : "free",
    ...(choice.plan === "pro"
      ? {
          upgrade_intent: "pro",
          upgrade_intent_id: id,
          upgrade_intent_billing:
            choice.billing === "monthly" ? "monthly" : "annual",
          upgrade_intent_created_at: now,
        }
      : {}),
  };
}

export function detectDevice(navigatorInfo) {
  const ua = navigatorInfo?.userAgent || "";
  if (
    /iPhone|iPad|iPod/i.test(ua) ||
    (/Macintosh/i.test(ua) && navigatorInfo?.maxTouchPoints > 1)
  )
    return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}

export function appStoreUrl(device) {
  if (device === "ios") return APP_STORE_URL;
  if (device === "android") return GOOGLE_PLAY_URL;
  return null;
}

export function downloadUrl(choice, origin = window.location.origin) {
  const configured = import.meta.env?.VITE_PUBLIC_SITE_URL;
  let base = origin;
  if (configured) {
    try {
      const url = new URL(configured);
      if (url.protocol === "https:" || url.protocol === "http:")
        base = url.origin;
    } catch {
      /* fall back to the actual website origin */
    }
  }
  return choice
    ? `${base}/get-app?${choiceQuery(choice)}`
    : `${base}/download`;
}
