# Website signup → Crittr app

The website uses the **same Supabase project** as the mobile app. Visitors create
an account or sign into an existing one; there is no separate website membership
database or web checkout.

## Flow

1. Acquisition CTAs open `/signup?plan=free` or
   `/signup?plan=pro&billing=annual|monthly`.
   The signup page also offers a direct App Store badge and a large QR code so
   visitors can download first and create their account in the app. The single
   QR URL is `/download`, with no account or plan information. This public route
   automatically opens the App Store on iOS (including iPad), shows Android's
   coming-soon state, and offers the QR and store link on desktop. Set
   `GOOGLE_PLAY_URL` in `src/constants/links.js` to the live listing at Android
   launch; the same printed QR will then route Android devices to Google Play.
2. Email signup sends the same first/last-name metadata as the app. Confirmation
   uses the app’s six-digit email OTP flow. Existing members can sign in, verify
   an unconfirmed email, or reset their password using a recovery OTP.
3. Google/Apple sign-in uses Supabase OAuth with PKCE and `/auth/callback`.
   The selected plan is carried in the callback URL and session storage.
4. Once authenticated, the website saves the preference to that user’s auth
   metadata. Failed writes can be retried without reusing an email code.
5. `/get-app` shows the App Store link on iOS, a locally rendered QR code on
   desktop, and the Android coming-soon state on Android. The QR opens the public
   download page. It contains **only plan/billing preferences**, no email, user
   ID, access token, password, or automatic-login credential.
6. The member signs into the app using the **same account / sign-in provider**.
   After onboarding, the native intent listener fetches current server metadata
   and opens the existing upgrade screen with the selected billing period.

## Intent contract (not an entitlement)

```js
{
  signup_source: "website",
  signup_plan: "pro", // or "free"
  upgrade_intent: "pro",
  upgrade_intent_id: "unique UUID per confirmed web choice",
  upgrade_intent_billing: "annual", // or "monthly"
  upgrade_intent_created_at: "ISO timestamp"
}
```

The app acknowledges a presented intent by writing
`upgrade_intent_consumed_id` and `upgrade_intent_consumed_at`. It does **not**
clear the original intent: acknowledging an older ID must not erase a newer
website choice. A Free choice does not erase an existing pending Pro intent.

This is user-editable navigation metadata. It never writes `profiles` paid
fields, enables paid API access, starts a trial, or grants Pro. Apple/Google and
RevenueCat remain the subscription authorities, using the existing Supabase user
ID. An existing verified Pro member’s preference is acknowledged without opening
another paywall. Offline reads/writes do not block the app; pending intent is
retried on navigation or foregrounding. Local presentation memory prevents
reopening a dismissed paywall if acknowledgement fails.

## Production configuration

- Set the public variables in `.env.example` on the website host. `.env.local`
  already points to the native app’s project for local development and is
  ignored by Git. Use only the anon/publishable key, **never a service-role key**.
- Set `VITE_PUBLIC_SITE_URL` to the public HTTPS website origin. Otherwise QR
  URLs use the current browser origin. Local `127.0.0.1` QR URLs are not reachable
  from a phone; test the actual QR handoff on the deployed public origin.
- Keep Supabase email confirmation enabled. The Confirm Signup and Reset
  Password email templates need `{{ .Token }}` for six-digit OTPs, as documented
  in the native app’s `docs/supabase-email-otp-setup.md`. OTP signup/recovery does
  not require a new redirect URL.
- For **web Google/Apple OAuth**, allow
  `https://YOUR_SITE/auth/callback` (including the plan/billing query parameters,
  e.g. `https://YOUR_SITE/auth/callback**`) in Supabase Auth URL Configuration.
  Use the exact production origin; allow the local origin separately only for
  development. The providers are enabled on this Supabase project, but web
  provider credentials / allowed origins must also support this website. In
  particular, Apple web OAuth needs the Apple Services ID and valid signing
  secret, not just native Sign in with Apple. Test both providers on the public
  origin before launch; provider availability alone does not verify web setup.
- Deploy with SPA fallbacks so direct visits to `/signup`, `/download`, `/get-app`,
  `/terms`, and `/auth/callback` serve `index.html`. Netlify `_redirects` and Vercel rewrites
  are included. Configure an equivalent fallback on other hosts.
- Release the native app changes in the sibling `crittr` repository. Previously
  installed builds cannot read this new intent until updated. No SQL migration
  or RevenueCat dashboard change is required for this metadata handoff.
- The website terms reuse the app’s existing `content/termsOfService.ts` copy.
  That source is marked as a legal draft; use approved terms before public launch.
- Android intentionally remains coming soon. Update the handoff only when its
  store listing is actually available.

## Verification

### “Signup is temporarily unavailable” in production

This message is generated by `src/lib/supabase.js` before any OAuth request.
It means the deployed JavaScript was built without `VITE_SUPABASE_URL`,
`VITE_SUPABASE_ANON_KEY`, or both. Supabase redirect settings do not fix it.

Set both exact variable names in the hosting project’s **Production** build
environment, using the same public project URL and anon/publishable key as
the mobile app. On Vercel, use Project → Settings → Environment Variables;
also select Preview if testing preview deployments. The native app’s
`EXPO_PUBLIC_` variable names are not read by this Vite website.

Rebuild/redeploy after saving. Vite embeds these values at build time; adding
them does not change an already-built deployment. `.env.local` is intentionally
ignored by Git and is only available on the local machine. Google/Apple client
secrets and Supabase service-role keys must remain outside `VITE_` variables.

Production builds now fail with the missing variable names if these settings
are absent, rather than publishing a signup flow that cannot initialize.

### Checks

`npm test`, `npm run lint`, and `npm run build` cover the website. Native tests:
`node --test tests/website-upgrade-intent.test.cjs`, `npm run typecheck`, and
`npm run check:arch` in the app repository. Browser auth checks use an isolated
local mock server rather than creating production accounts or sending emails.
Live email delivery, public-origin OAuth, real-device QR/deep linking, and a
store-installed updated native build still need a release-environment check.

Native integration files: `utils/websiteUpgradeIntent.ts`,
`services/websiteUpgradeIntent.ts`, `hooks/useWebsiteUpgradeIntent.ts`,
`components/iap/WebsiteUpgradeIntent.tsx`, the logged-in layout, and the upgrade
screen’s billing query handling. Existing subscription and restore flows remain
the purchase authority.
