# Nibble

[nibble.pictures](https://nibble.pictures): three random photos from Wikimedia Commons, the top two punched with hand-cut holes and stacked. Click for a new set.

The site is plain static files in `public/`, with no build step.

- Local: `python3 -m http.server 8080 -d public`
- Deploy: Cloudflare Worker with static assets (`wrangler.jsonc`), deployed by Workers Builds on push to `main`.
