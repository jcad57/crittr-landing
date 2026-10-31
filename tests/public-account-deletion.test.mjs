import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "vite";
import { privacyPolicySections } from "../src/data/privacyPolicy.js";
import { termsOfServiceSections } from "../src/data/termsOfService.js";
import {
  DELETION_REQUEST_HREF,
  DELETION_REQUEST_SUBJECT,
  DELETION_SUPPORT_EMAIL,
} from "../src/data/accountDeletion.js";

let vite, AppRoutes;
before(async () => {
  // Transform the actual application routes without opening a server socket.
  vite = await createServer({
    server: { middlewareMode: true, hmr: false, ws: false, watch: null },
    appType: "custom",
  });
  ({ AppRoutes } = await vite.ssrLoadModule("/src/App.jsx"));
});
after(async () => { await vite?.close(); });

function renderRoute(path) {
  return renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [path] }, createElement(AppRoutes)));
}

test("the public deletion route renders without a session, installed app or credential form", () => {
  const html = renderRoute("/delete-account");
  assert.match(html, /<h1[^>]*>Delete your Crittr account<\/h1>/);
  assert.match(html, /without installing the app or signing in/);
  assert.match(html, /mailto:support@crittrapp\.com\?subject=/);
  assert.match(html, /opening it does not delete your account/);
  assert.match(html, /verify account ownership/);
  assert.match(html, /Do not send your password, sign-in codes or payment card details/);
  assert.doesNotMatch(html, /<form|<input|account (?:has been|was) deleted/i);
});

test("email request targets support with a deletion subject and account identity, without credentials", () => {
  const link = new URL(DELETION_REQUEST_HREF);
  assert.equal(link.protocol, "mailto:");
  assert.equal(link.pathname, DELETION_SUPPORT_EMAIL);
  assert.equal(link.searchParams.get("subject"), DELETION_REQUEST_SUBJECT);
  assert.match(link.searchParams.get("body"), /deletion of my Crittr account and associated data/);
  assert.match(link.searchParams.get("body"), /Account email address:/);
  assert.match(link.searchParams.get("body"), /verify that I own this account/);
  assert.doesNotMatch(link.searchParams.get("body"), /password|token|sign-in code|credit card/i);
});

test("deletion scope explains shared accounts, backups, provider records and separate subscription cancellation", () => {
  const html = renderRoute("/delete-account");
  for (const text of [
    "pets you own", "care history", "chat history", "attached files",
    "Co-carers keep their own accounts", "does not delete pets owned by another person",
    "backups", "security", "legal obligations", "dispute resolution",
    "transaction records", "retention requirements", "outside Crittr’s control",
    "does not cancel an App Store or Google", "store that bills you",
  ]) assert.ok(html.includes(text), `Missing deletion explanation: ${text}`);
  assert.doesNotMatch(html, /within \d+|immediately deleted|all data.*permanently (?:erased|deleted)/i);
});

test("privacy and the shared footer prominently link to public deletion, with a return privacy link", () => {
  const privacy = renderRoute("/privacy");
  assert.match(privacy, /aria-label="Account and data deletion"/);
  assert.match(privacy, /href="\/delete-account"[^>]*>Request account deletion/);
  for (const route of ["/privacy", "/terms", "/delete-account"]) {
    const links = renderRoute(route).match(/<a\b[^>]*>[\s\S]*?<\/a>/g) ?? [];
    assert.ok(links.some((link) => link.includes('href="/delete-account"') &&
      link.includes('class="footer-delete-link"') && link.includes("Delete account &amp; data")),
    `Missing footer deletion link on ${route}`);
  }
  assert.match(renderRoute("/delete-account"), /href="\/privacy"/);
});

test("public notices disclose the app providers, AI context, consent choices and account deletion behavior", () => {
  const policy = privacyPolicySections.flatMap((section) => section.paragraphs).join("\n");
  for (const disclosure of ["Firebase Analytics", "Google AdMob", "Supabase", "RevenueCat", "Anthropic", "conversation history", "co-care", "Advertising privacy", "account and associated data deletion", "does not cancel", "backups"]) {
    assert.ok(policy.toLowerCase().includes(disclosure.toLowerCase()), `Missing privacy disclosure: ${disclosure}`);
  }
  assert.doesNotMatch(policy, /details will be described in a future update|limited technical data/);
  const terms = termsOfServiceSections.flatMap((section) => section.paragraphs).join("\n");
  assert.match(terms, /banner and interstitial formats/);
  assert.match(terms, /request account deletion in Settings or by contacting support@crittrapp.com/);
  assert.match(terms, /Deleting your account does not cancel an App Store or Google Play subscription/);
  assert.doesNotMatch(terms, /app-open|Features to delete your account.*may be offered/);
});

test("existing Vercel SPA rewrite supports direct public deletion, privacy and terms URLs", async () => {
  const config = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
  assert.ok(config.rewrites.some(({ source, destination }) => source === "/(.*)" && destination === "/index.html"));
});
