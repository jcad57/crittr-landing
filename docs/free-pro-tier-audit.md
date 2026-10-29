# Landing-page Free / Pro tier audit

Audited October 29, 2026 against the agreed tier matrix in the sibling app repository (`crittr/docs/revised-free-pro-tiers.md`) and its tier/paywall constants.

| Feature | Free | Crittr Pro |
| --- | --- | --- |
| Owned pets | Up to 3 total, including memorialized and archived pets | Unlimited |
| Co-carers | 1 per pet, based on the pet owner's plan | Unlimited per pet |
| Joining a co-care invitation | Available on Free | Available |
| Activity logs and history | Unlimited | Unlimited |
| Saved foods, medications, vaccinations | Unlimited | Unlimited |
| Medical record storage and uploads | Upgrade required for uploads | Included, subject to pet permissions |
| CrittrAI | Upgrade required | Included |
| Ad-free experience | Ads may be enabled in a future release | No ads |
| Health hub, weight, vet visits, reminders | Included | Included |

Shared pets do not use the invitee's owned-pet allowance. Pending invitations reserve a co-carer slot. Existing records remain readable after downgrade under the app's retention policy; uploads require the uploading account to have Pro and the relevant pet permission.

## Corrections

- Pricing: replaced the old one-pet allowance with 3 pets and added the per-pet co-carer limit and unlimited saved care items. Moved reminders into Free and removed the unsupported priority-support claim. Pro lists the five agreed unlocks, including No ads added October 29, in addition to Free features.
- Hero and feature cards: clarified Free pet/co-care limits, unlimited Free activity logs, and Pro-only document uploads and CrittrAI.
- Co-care section: explained the owner's plan and Free invitation acceptance. The general co-care CTA now starts Free signup.
- Health section and interactive previews: distinguished unlimited medication/vaccination tracking from Pro document storage and uploads. The general health CTA now starts Free signup.
- Trial disclosure: qualified the existing seven-day trial for eligible accounts. Prices and the annual/monthly signup preference handoff remain unchanged.

The signup, download, metadata, legal pages and footer contain no additional conflicting tier lists. Existing design mockups are separate artifacts and do not ship as landing-page routes. Existing local design edits were retained.

The No ads benefit is displayed in both products. Existing native ad eligibility excludes Pro accounts, and the app’s global ads flag remains disabled. No ad delivery is enabled by this UI update.

## Validation

Passed `npm test` (6 tests), `npm run lint`, `npm run build`, and `git diff --check`. Browser review confirms the corrected tier copy, annual/monthly Pro signup links, Free signup links and no horizontal overflow at 390px width. The app passed all 315 tests and its TypeScript, lint and architecture checks; native paywall review confirms No ads and both plan options remain visible. These source edits do not publish the website or change app/database entitlements.
