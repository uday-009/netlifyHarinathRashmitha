# Harinath & Rashmitha - Wedding Invitation (static site)

No server, no Node, no build. Just static files - host anywhere (Netlify, Cloudflare Pages, GitHub Pages).

## Add your photos (inside `assests/photos/`)
- `groom.jpg`  - Harinath's portrait (replace the file, keep the name)
- `bride.jpg`  - Rashmitha's portrait (replace the file, keep the name)
- `gallery-1.jpg`, `gallery-2.jpg`, `gallery-3.jpg` ... - Captured Moments gallery
  - Any number of photos; they load in number order and stop at the first missing number (no gaps!).
  - First 4 show; the rest sit behind "View more photos".
  - Must be .jpg. Resize to about 1200px wide first so the page loads fast on phones.

## Deploy on Netlify
Zip the folder contents (index.html must be at the top level of the zip, or drag the folder itself) and drop it on app.netlify.com/drop.

## Settings (top of script.js)
GROOM_WHATSAPP (RSVP number), STORY_VIDEO_ID (YouTube video id)
