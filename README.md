# Birthday Surprise Website + Real-Time Admin Panel

A personalized, multi-page birthday surprise website (Express + SQLite + Socket.io) with a live admin panel that sees every device/visitor in real time.

## Run

```bash
npm start
```

- Site: http://localhost:3000
- Admin panel: http://localhost:3000/admin
- Server log (if backgrounded): `/tmp/birthday-server.log`
- DB: `data/birthday.db`

### Make it public (phones reach the site)

Free + secure + private (no account needed):

```bash
cloudflared tunnel --url http://localhost:3000
```

Fallback: `ngrok http 3000` (ngrok installed at `/home/kali/ngrok`, authtoken configured). Copy the tunnel URL to any phone.

## History (git commits)

| Commit | What |
| --- | --- |
| `e3a319c` | Initial commit: existing birthday surprise project |
| `97cfdf8` | Complete 6-page birthday website with 45+ features |
| `97ee1b1` | Admin panel: real-time dashboard, device intel, music system, content editor & planner |
| `2c7c836` | Fix site-loading bugs + complete visitor sharing & admin integration (curtain z-index, Wordle TDZ, entrance none auto-open, safe() boot, #knowMeQuiz, DELETE photo route) |
| `7d1bb8b` | Fully responsive & performance-adapted for mobile (Device module, particle/confetti scaling, mobile nav, reduced-motion) |
| WIP (uncommitted) | Backend: `/api/summary` endpoint + `admin-broadcast` socket + site-side `site-broadcast` toast/confetti receiver |

## Architecture

- `server.js` — Express routes, Socket.io, multer uploads (`uploads/photos`, `uploads/music`), static `public/`.
- `db.js` — SQLite schema: `visitors, photos, wishes, quiz_scores, devices, captured_photos, music_tracks, activity_log, site_settings, planner_items, surprise_config`.
- `public/app.js` — CONFIG + admin overrides (`applyAdminOverrides` fetches `/api/settings` + `/api/config`), `Device`, `DeviceIntel` (socket emit buffer, browser/permission/geo intel, camera + photo upload), `AudioManager` (uploads + YouTube), all feature inits wrapped in `safe()`.
- 6 pages: `index.html` (home/hero, flip cards, counter, stats, cake, heart progress, wheel, rizz, compliments, funny questions, know-me quiz, scratch, gift, star sky, slot, cookies, wordle, konami), `letter.html`, `gallery.html`, `wishes.html`, `surprise.html`, `finale.html`.

## Admin API surface

`/api/health`, `/api/visitors`, `/api/visitor`, `/api/devices` (GET/POST), `/api/captured-photos` (GET/POST/DELETE), `/api/photos` (GET/POST), `/api/music` (GET/POST/PUT/DELETE), `/api/activity`, `/api/settings` (GET/PUT), `/api/wishes` (GET/POST/DELETE), `/api/quiz-scores` (GET/POST), `/api/planner` (CRUD), `/api/config` (GET/PUT), `/api/db-export`, `/api/summary`.

Socket events: `visitor-joined`, `visitor-activity`, `device-info`, `photo-captured`, `admin-broadcast` → site; `visitor-count`, `admin-activity`, `admin-device`, `admin-photo`, `site-broadcast` → clients.

## Saved for later (admin panel upgrade — full plan)

User request: "upgrade the UI/UX of the admin panel, add more tools to access ALL the data on devices where the site is running, make a proper plan."

One part is ALREADY DONE (on disk, uncommitted): backend `/api/summary` + `admin-broadcast` socket listener + site-side `site-broadcast` toast/confetti.

Remaining phases:

1. **Auth + live status bookkeeping** (optional but recommended before going public):
   - Add a simple admin password/pin for `/api/*` writes + admin panel, or at minimum do not expose DB-export publicly.
2. **UI/UX polish (admin.css + admin.html)**:
   - Gradient accent headers, card hover/elevation, consistent empty states, toast notifications instead of `alert()`.
   - Clickable stat cards (jump to tab), live status strip (online count, socket health).
   - Devices tab: search box, filter by platform/browser/city/camera permission, sortable columns.
3. **New tools (tabs/features)**:
   - **Activity Log tab** — full replay of `activity_log` (reuse GET `/api/activity`), filter by page/type/IP. (Backend ready.)
   - **Wishes tab** — wall of messages + scores, read/delete. (`/api/wishes`, `/api/quiz-scores` ready.)
   - **Visitor Timeline** — click a device row → dossier: joined, activity trail, pages visited, quiz score, photos taken, camera/mic perms. Uses `visitors` + `devices` + `activity_log` + `quiz_scores` + `captured_photos`.
   - **Device Map** — scatter plot from `devices.latitude/longitude` + country/city list. (Geo already being collected.)
   - **Broadcast / Live Control** — push toast/banner/confetti to all online visitors. (Backend + site receiver DONE.)
   - **Server Health card** — uptime, DB size, upload counts (`/api/health` + `/api/summary`). (Summary DONE.)
4. **Database tab upgrade**: per-table row counts, in-table search filter, per-table CSV export (JSON export exists).
5. **Verification**: curl every API, headless-Chromium mobile render of admin, zero console errors, commit.

Files to touch: `public/admin.html`, `public/admin.css`, `public/admin.js`; small additions only if needed in `server.js`.