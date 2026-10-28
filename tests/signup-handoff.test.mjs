import test from "node:test";
import assert from "node:assert/strict";
import {
  choiceQuery,
  detectDevice,
  downloadUrl,
  intentMetadata,
  readSignupChoice,
  signupHref,
} from "../src/lib/signupIntent.js";
import { authMessage, saveAccountChoice } from "../src/services/webAuth.js";

test("CTA choices are allowlisted and preserve monthly/annual Pro selection", () => {
  assert.equal(
    signupHref("pro", "monthly"),
    "/signup?plan=pro&billing=monthly",
  );
  assert.deepEqual(
    readSignupChoice(
      "?plan=pro&billing=monthly&redirect=https://elsewhere.example",
    ),
    { plan: "pro", billing: "monthly" },
  );
  assert.deepEqual(readSignupChoice("?plan=admin&billing=anything"), {
    plan: "free",
    billing: "annual",
  });
  assert.equal(choiceQuery({ plan: "free", billing: "monthly" }), "plan=free");
});

test("Free never grants Pro or erases a pending upgrade; Pro writes navigation metadata only", () => {
  const free = intentMetadata(
    { plan: "free" },
    "fixture-intent",
    "2026-10-27T00:00:00Z",
  );
  assert.equal(
    Object.keys(free).some((key) => key.startsWith("upgrade_intent")),
    false,
  );
  const pro = intentMetadata(
    { plan: "pro", billing: "monthly" },
    "fixture-intent",
    "2026-10-27T00:00:00Z",
  );
  assert.equal(pro.upgrade_intent, "pro");
  assert.equal(pro.upgrade_intent_billing, "monthly");
  assert.equal(pro.upgrade_intent_id, "fixture-intent");
  for (const field of [
    "crittr_pro_active",
    "crittr_pro_until",
    "subscription_store",
    "entitlement",
    "role",
  ])
    assert.equal(pro[field], undefined);
});

test("device detection covers iOS, desktop-class iPad, Android, and computers", () => {
  assert.equal(detectDevice({ userAgent: "Mozilla iPhone" }), "ios");
  assert.equal(detectDevice({ userAgent: "Mozilla iPad" }), "ios");
  assert.equal(
    detectDevice({ userAgent: "Mozilla Macintosh", maxTouchPoints: 5 }),
    "ios",
  );
  assert.equal(
    detectDevice({ userAgent: "Mozilla Macintosh", maxTouchPoints: 0 }),
    "desktop",
  );
  assert.equal(detectDevice({ userAgent: "Mozilla Android" }), "android");
  assert.equal(detectDevice({ userAgent: "Mozilla Windows NT" }), "desktop");
});

test("QR handoff URL contains only plan preferences, with no account data or credentials", () => {
  const url = new URL(
    downloadUrl(
      {
        plan: "pro",
        billing: "annual",
        email: "private@example.com",
        access_token: "secret",
      },
      "https://crittr.example",
    ),
  );
  assert.equal(url.pathname, "/get-app");
  assert.deepEqual([...url.searchParams.keys()], ["plan", "billing"]);
  assert.equal(url.href.includes("private"), false);
  assert.equal(url.href.includes("secret"), false);
});

test("intent save requires an authenticated user and propagates failed writes for retry", async () => {
  const writes = [];
  const auth = {
    getUser: async () => ({
      data: { user: { id: "member", email: "test@example.com" } },
      error: null,
    }),
    updateUser: async (payload) => {
      writes.push(payload);
      return { error: null };
    },
  };
  const user = await saveAccountChoice(
    { plan: "pro", billing: "monthly" },
    auth,
  );
  assert.equal(user.id, "member");
  assert.equal(writes[0].data.upgrade_intent, "pro");
  assert.equal(writes[0].data.upgrade_intent_billing, "monthly");
  auth.getUser = async () => ({ data: { user: null }, error: null });
  await assert.rejects(
    saveAccountChoice({ plan: "pro" }, auth),
    /Please sign in/,
  );
  assert.equal(writes.length, 1);
  auth.getUser = async () => ({
    data: { user: { id: "member" } },
    error: null,
  });
  auth.updateUser = async () => ({ error: new Error("offline") });
  await assert.rejects(saveAccountChoice({ plan: "pro" }, auth), /offline/);
});

test("auth errors explain expired codes, rate limiting, and account sign-in failures", () => {
  assert.match(authMessage({ code: "invalid_credentials" }), /didn’t match/);
  assert.match(authMessage({ status: 429 }), /wait a minute/);
  assert.match(
    authMessage({ message: "Token has expired or is invalid" }),
    /request a new code/,
  );
  assert.match(authMessage({ message: "Failed to fetch" }), /connection/);
});
