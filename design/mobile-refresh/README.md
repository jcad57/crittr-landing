# Crittr mobile design exploration

Six code-rendered app mockups that bring the landing website's design into the native app. These are interactive design proposals with illustrative data; the native project and production website routes are unchanged.

## Review

With the landing site's existing dev server running, open:

`http://localhost:5173/design/mobile-refresh/index.html`

- **All screens** shows the complete collection.
- **Explore a screen** shows one phone with screen selection and design notes.
- The arrow beside each screen opens a full-size individual preview.
- Inside a phone, try the bottom navigation, schedule completion controls, pet profiles, profile tabs, medication completion, and activity picker.
- CrittrAI's sample composer is local only. No questions, activities, invitations, or account changes are sent to a backend.

## Screens

| Screen | Design changes |
| --- | --- |
| Home | Sage daily progress panel, native category icons, clear activity feed, orange pressable action, peach vet visit card. |
| Schedule | Peach week selector, colored activity tiles, gray pending and green complete states. Completing a task slides its checkmark left to reveal decorative dots. |
| My pets | Peach and lavender pet cards, original pet imagery, visible roles and carers, sage shared-care message. |
| Pet profile | Peach identity card, pastel stat tiles, organized details, lavender co-care callout. |
| Health | Clearly labeled action banner, neutral record cards, color-coded category tiles, explicit status chips. |
| CrittrAI | Lavender welcome and prompt suggestions, original welcome copy, pet context, orange send action. |

## Design tokens

- Headings: **Fredoka**, generally weight 600.
- Body and interface: **Nunito**, weights 400–900.
- Occasional handwritten accent: **Caveat**.
- Orange: `#FD8A2D`; sage: `#E6ECD7`; lavender: `#ECE1F5`; peach: `#FFE5D5`; cream: `#FAF7F1`.
- Orange actions use white type, a dark offset shadow, and a downward pressed state.
- Phone previews use live text and CSS, not rasterized UI. Photos and activity icons remain image assets.
- Icons are sourced from the native app's `assets/icons` and existing landing-page copies. No substitute activity icon set was invented.

## Basis in the native project

Reviewed `theme/typography.ts`, `theme/colors.ts`, the dashboard, schedule, pets and health tab roots, `pet/[id]/index.tsx`, `crittr-ai.tsx`, and their dashboard, schedule, activity and navigation components. The five bottom navigation destinations stay Home, Schedule, Pets, Health, and CrittrAI.

The native app currently mixes Fraunces, DM Sans and Instrument Sans. This proposal uses the website's actual self-hosted Fredoka and Nunito font files. Section structure and existing capabilities are retained; visual grouping, selected labels and navigation within the profile are proposed refinements.

## Build the review artifact

From the landing project root:

```sh
npx vite build --config design/mobile-refresh/vite.config.js
npx vite preview --config design/mobile-refresh/vite.config.js
```

The self-contained review build is written to `design/mobile-refresh/dist`. Its build is separate from the production website and does not require Supabase configuration.

PNG previews are saved in `exports/`. The interactive source remains the sharpest way to inspect type and interactions. The gallery adapts to desktop, tablet, and mobile widths and respects reduced motion preferences.
