# Birthday Surprise Website + Real-Time Admin

A personalized, multi-page birthday surprise website (Express + SQLite + Socket.io) with a real-time “Surprise HQ” admin panel.

## Run

```bash
npm start
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin
- DB: `data/birthday.db`
- Server log when detached: `/tmp/opencode/day6-server.log`

Background/CI-friendly start:

```bash
cd /home/kali/Desktop/day6
nohup node server.js >/tmp/opencode/day6-server.log 2>&1 &
curl -fsS http://localhost:3000/api/health
```

### Make it public (phones reach the site)

Free + secure + private (no account needed):

```bash
cloudflared tunnel --url http://localhost:3000
```

Fallback: `ngrok http 3000` (ngrok installed at `/home/kali/ngrok`, authtoken configured). Copy the tunnel URL to any phone.

## Home page redesign (2026)

The public home page was rebuilt around a researched “editorial birthday issue” direction:

- **Hero** — oversized editorial headline, personal badge, quick facts, orbit/age medallion and a “100% loved” postcard.
- **Time together** — the existing live counter, restyled as a single glass ribbon.
- **The birthday edit** — asymmetric bento grid for age, soundtrack, adventures, laughs, favourite person, mood and a quote.
- **Reasons, on repeat** — accessible kinetic marquee driven by `CONFIG.reasonsILoveYou`; pauses on hover and becomes static with reduced motion.
- **Why you matter** — the six “little things” upgraded into an asymmetric feature bento with short notes.
- **Little chapters** — timeline postcards from `CONFIG.timeline`; four-up on desktop, keyboard-focusable horizontal snap track on mobile.
- **Open when…** — three native `<details>` notes for the days that need them.
- **Cake atelier** — a clickable bake → frost → decorate → candles → wish → blow → cut sequence with number candles seated on the cake, a real slice reveal and an optional microphone blow; tapping the cake to bake now also auto-runs bake → frost → decorate → candle setup, then stops for the user to light, blow and cut manually.
- **Choose your next chapter** — large destination cards to the letter, gallery and wishes.

The same system now carries through the rest of the site:

- **Surprise** — numbered gifts, a jump-to-surprise map and consistent game cards.
- **Letter** — editorial envelope stage, reasons bento, timeline cards and a word-game card.
- **Gallery** — masonry photo wall, live frame count and a redesigned share card.
- **Wishes** — sticky wish form beside a quote-style wish wall with a live note count.
- **Finale** — chapter hero, generated closing actions and a full section rhythm for the constellation, coupons, secrets and credits.
- Every chapter ends with a “next chapter” link in the narrative order.

New interactions include a scroll-progress bar, pointer spotlight on bento cards, a synchronised music toggle, story-track controls and config-driven personalisation. The pinch-heart entrance now waits up to four seconds for saved admin settings, so a slow first load cannot silently fall back to the wrong entrance style.

Research, trend selection and the full section plan are documented in [`DESIGN-NOTES.md`](DESIGN-NOTES.md).

## Admin — Surprise HQ

Eleven tabs:

`Dashboard`, `Live control`, `Devices`, `Wishes`, `Activity`, `Photos`, `Music`, `Content`, `Planner`, `Database`, `Settings`.

Key capabilities:

- Live online count and activity feed (admin sockets excluded from visitor count).
- Searchable/filterable device table with dossier modal, focus trap, Escape close and focus restoration.
- Device and database pagination (`Load 200 more rows` for DB; incremental device rows).
- Per-table database explorer + CSV export.
- Filtered/paginated activity, summary breakdowns, visitor dossier.
- Broadcast toast/confetti control.
- Custom confirmation dialogs for destructive actions instead of native `window.confirm()`.
- Responsive layout with mobile “swipe to see all columns” hints and accessible table/button semantics.

## Architecture

- `server.js` — Express routes, Socket.io, multer uploads (`uploads/photos`, `uploads/music`), static `public/`.
- `db.js` — SQLite schema: `visitors, photos, wishes, quiz_scores, devices, captured_photos, music_tracks, activity_log, site_settings, planner_items, surprise_config`.
- `public/app.js` — `CONFIG` + admin overrides (`applyAdminOverrides`), `Device`, `DeviceIntel`, `AudioManager`, all feature inits wrapped in `safe()`.
- `public/index.html` — the redesigned home experience.
- `public/styles.css` — shared design system, home bento/hero/marquee/story components, focus-visible and reduced-motion rules.
- `public/admin.html`, `public/admin.css`, `public/admin.js` — Surprise HQ.
- 6 public pages: `index.html`, `letter.html`, `gallery.html`, `wishes.html`, `surprise.html`, `finale.html`.

## API surface

`/api/health`, `/api/visitors`, `/api/visitor`, `/api/devices`, `/api/devices/:visitorId/dossier`, `/api/captured-photos` (GET/POST/DELETE), `/api/photos` (GET/POST), `/api/music` (GET/POST/PUT/DELETE), `/api/activity` (filters + pagination), `/api/settings` (GET/PUT), `/api/wishes` (GET/POST/DELETE), `/api/quiz-scores` (GET/POST), `/api/planner` (CRUD), `/api/config` (GET/PUT), `/api/summary`, `/api/db`, `/api/db/:table`, `/api/db/:table/export.csv`, `/api/db-export`, `/api/broadcast`.

Socket events: `visitor-joined`, `visitor-activity`, `device-info`, `photo-captured`, `admin-broadcast` → site; `visitor-count`, `admin-activity`, `admin-device`, `admin-photo`, `site-broadcast` → clients.

## Verification

The project was checked with headless Chrome via `agent-browser`:

```bash
agent-browser close --all
agent-browser set viewport 1280 900
agent-browser open http://localhost:3000
agent-browser wait 1500
agent-browser a11y
agent-browser errors
agent-browser console
```

Results for the latest pass:

- `node -c server.js`, `node -c public/app.js`, `node -c public/admin.js` — clean.
- All six public pages: **0 axe violations** at 1280 px and 390 px, no page/console errors, no broken images.
- Admin: **0 axe violations**; no page/console errors.
- No document-level horizontal overflow at 1280, 390 or 320 px on any public page.
- Remaining axe `incomplete` colour-contrast items are manual reviews caused by gradient backgrounds, not automated failures.
- Home interaction checks: pinch entrance, bento music toggle + nav sync, open-when note, story next/previous, scroll progress, and the full cake atelier at 1280/390/320 px (candle geometry, keyboard, gated cut, mic denial/timeout, reset).
- Admin checks: dossier modal, focus restoration, custom delete confirmation, device/DB load-more, mobile nav and table hints.

## Notes

- The site uses Google Fonts and GSAP/canvas-confetti CDNs; on a slow connection the first boot can take a few seconds. API-fetched admin overrides now have a four-second grace period.
- `data/birthday.db` is a live SQLite database. Back it up before deploying or resetting demo data.
- Keep the reduced-motion path intact when adding new animations. The site intentionally supports keyboard, screen readers, touch, and low-end devices.
