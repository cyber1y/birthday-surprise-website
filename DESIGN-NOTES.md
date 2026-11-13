# Home page redesign — research, plan and build notes

## 1. Goal

Make the public home page feel like a premium, personal birthday experience rather than a stack of generic sections. The page should be more visual, more emotional, easier to scan, and more fun to interact with — without losing the existing content, accessibility or performance.

## 2. Research synthesis

The 2026 trend research points to a few patterns that fit this project:

| Signal | What it means here |
| --- | --- |
| **Bento grids** | Use asymmetric cards with different visual weight instead of another row of identical boxes. Card size communicates what matters most. |
| **Kinetic / editorial typography** | A large expressive headline, italic display type, and a slow scrolling “reasons” ribbon make the page feel alive without needing heavy 3D. |
| **Organic shapes** | Soft rings, circular medallions, rounded cards and flowing section rhythm replace hard rectangular blocks. |
| **Saturated colour + strategic contrast** | Keep the berry/pink base, then add a small acid-lime accent for labels, buttons and highlights. Use contrast instead of more gradients. |
| **Glassmorphism 2.0** | Use transparency only where it adds depth — navigation, floating chips, the time ribbon — and keep large content cards lighter and cheaper to paint. |
| **Dark mode as default** | The site already has a night-ceremony mood; lean into it instead of switching to a generic light layout. |
| **Micro-interactions** | Hover spotlight, card lift, story scrolling, open-when notes, music toggle and scroll progress add personality with small, cheap effects. |
| **Personalisation** | Pull age, stats, reasons, timeline chapters and the birthday melody from `CONFIG` so the page still feels written for one person. |
| **Performance + accessibility are the foundation** | Every effect has a reduced-motion path. Cards stay keyboard accessible. Scrolling areas are focusable. No horizontal page overflow. |

Sources reviewed:

- Figma, [Top Web design trends for 2026](https://www.figma.com/resource-library/web-design-trends/)
- StudioMeyer, [Web Design Trends 2026: 12 Developments to Know](https://studiomeyer.io/en/blog/webdesign-trends-2026)
- Hawd Design, [Bento Grid Web Design: The 2026 Trend Explained](https://hawd-design.com/en/blog/bento-grid-2026/)
- Awwwards, [2026 website showcase](https://www.awwwards.com/websites/2026/)
- Interaction Design Foundation, [UX / UI design resource library](https://www.interaction-design.org/literature)

The research was used as a filter, not a checklist. Three.js/WebGL, maximalist collage, neo-brutalism and a full retro-futurist theme were deliberately skipped: they would compete with the love-letter tone, add unnecessary weight, or make the personal content harder to read.

## 3. Design direction

**“Editorial birthday issue.”**

- Expressive serif headlines + clean Inter body copy.
- Warm dark berry background with a single acid-lime accent.
- A large “22 chapters” medallion as the visual anchor.
- Bento cards for numbers, mood, music and a note.
- One slow marquee for reasons, one horizontal story track for chapters.
- Native `<details>` notes for intimate, low-friction reveals.
- Soft circular motifs and paper/postcard details rather than more glass everywhere.

## 4. Home page section plan

1. **Hero**
   - Personal badge, oversized two-line headline, clear primary/secondary actions.
   - Three quick facts: age, favourite human, more chapters.
   - Decorative orbit/medallion + “100% loved” postcard.
   - Scroll cue into the live counter.

2. **Time together**
   - Existing live days/hours/minutes/seconds counter, restyled as a single glass ribbon.

3. **The birthday edit**
   - Seven-card bento: age chapter, soundtrack, adventures, laughs, favourite person, current mood, quote.
   - Values come from `CONFIG` where available.

4. **Reasons, on repeat**
   - Accessible kinetic marquee using `CONFIG.reasonsILoveYou`.
   - Duplicate track is `aria-hidden`; original track exposes a list.
   - Pauses on hover; becomes a static wrapped list with reduced motion.

5. **Why you matter**
   - Existing six “things I love” cards upgraded to an asymmetric bento with short notes and large index numbers.

6. **Little chapters**
   - Timeline postcards generated from `CONFIG.timeline`.
   - Desktop: four-up grid. Mobile: horizontal snap track with previous/next buttons.
   - Track is focusable for keyboard scrolling.

7. **Open when…**
   - Three native `<details>` notes for “miss me”, “need a smile”, and “forget how loved you are”.
   - No custom JS required to open/close; works with keyboard and screen readers.

8. **A cake just for you**
   - Existing cake interaction preserved and given a clearer section header + live status.

9. **Choose your next chapter**
   - Three large destination cards to letter, gallery and wishes.
   - Keeps the home page from dead-ending after the cake.

## 5. New interactions added

- Scroll progress bar.
- Pointer-follow spotlight on bento cards (hover-capable devices only).
- Bento music toggle, synchronised with the navigation music button.
- Horizontal story track controls with start/end disabled states.
- Open-when notes.
- Kinetic reasons marquee.
- Hero age personalisation and config-driven bento values.
- “Pinch heart” entrance now waits up to 4 seconds for saved admin settings, so a slow first load cannot silently fall back to the wrong entrance style.

## 6. Accessibility and performance guardrails

- No new images; all decoration is CSS/SVG/text.
- New headings follow the existing `h1 → h2 → h3` flow.
- Decorative orbit, postcard, sparks, emoji and duplicate marquee are hidden from assistive technology.
- All controls are native buttons, links or `<details>`.
- Story track has a tab stop and a label; controls have accessible names and disabled states.
- `prefers-reduced-motion` disables the marquee, orbit, spark and emoji animations and removes card transforms.
- Glass blur is limited; bento/next cards use light gradients, not full backdrop filters.
- No horizontal page overflow at 1280, 390 or 320 px.
- Axe-core result: **0 violations**; the only remaining items are the existing gradient-related manual contrast reviews.

## 7. Verification performed

- `node -c server.js`, `node -c public/app.js`, `node -c public/admin.js`.
- Browser console and page error checks on the home page.
- Desktop/mobile DOM layout checks; no document-level horizontal overflow.
- Interaction checks: music toggle + nav sync, open-when note, story next/previous, scroll progress, cake blow/cut, pinch entrance.
- Axe audit on desktop and mobile with animations frozen for deterministic results.
- Existing public pages re-checked for regressions after shared CSS changes.
