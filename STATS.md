# Nibble: project stats

Final snapshot, 2026-10-11, when the project was called finished. It went live at nibble.pictures partway
through the same sitting; download, link preview and polish followed.

## Time
- Elapsed: ~2 hours 9 minutes (2026-10-11 14:55 → 17:05, US Central)
- Active work: the same ~2 hours 9 minutes, with no gap over 20 minutes; idea to finished site in one sitting
- First live on the domain at ~16:45, about 1 hour 50 minutes in

## Conversation and compute
- Messages from Jake: ~47
- Model calls: 199, all Claude Opus 5.5
- Tool uses: 157 (127 shell commands, 26 file/screenshot reads, 4 file writes)
- Tokens (≈ ¾ of a word each):
  - Output written: ~187,000
  - Cache reads: ~35.9 million (each step re-reads the conversation so far)
  - Cache writes: ~275,000
- One session, no context compactions

## Code
- 8 commits, including this snapshot; the site was built outside git as numbered steps and committed once
  it had settled, so most of the history is in the session, not the repo
- ~1,110 lines added, 16 removed
- 1,010 lines: `index.html` 705, `favorites.js` 160, and the link-preview generator `tools/og/og.html` 145
- 4 site files, about 300 KB in total (the 1200x630 link preview is 250 KB of that), no build step, no dependencies
- 10 tracked files

## Content
- 14 numbered steps explored before settling, archived locally in `steps-archive/` (not in git)
- 11 punch shapes: circle, square, triangle, star, heart, sakura, strawberry, apple, butterfly, umbrella, candy
- 3 photos per set, 40 holes per punched sheet, 2 shadows per sheet (tight contact + wide ambient)
- Downloads at 2x the window (about 2880x1800 on a laptop, long side capped at 4096px), JPEG at 92%
- 1 link-preview card, from public-domain and CC0 photos

## Decisions along the way
- Path: two punched photos → a third underneath (step 2) → branches into soft edges, dappled noise, more layers,
  even dispersal → back to step 2 → stacked-paper shadows → imperfect edges, colour-blended shadows → magazine
  texture → warm, grainy, layered shadows ("perfect", step 13) → favorites (step 14), then steps retired
- Floating flecks removed: pieces of a sheet cut free by overlapping holes fall away, as they would in paper
- Texture tuned by Jake with sliders: paper grain 0.9, halftone 0.1, 3px dots
- Shapes redrawn from references: softer heart and star, notched sakura, strawberry twice, sturdier apple stem,
  rounded butterfly body
- Name: Circles → leafcutter-bee ideas → hole-punch domains → soft, childish verbs → nibbled.pictures →
  **Nibble** at nibble.pictures (name = word, ending = context)
- Favicon: the sakura punch shape, in pink
- Controls: one cluster bottom-right, ordered shapes, favorites, download, about; hovering any of it shows it all
- Hosting: GitHub (jrochfo/nibble, public) → Cloudflare Worker with static assets, domain via Cloudflare Registrar

## Shipped
nibble.pictures: three random Wikimedia Commons photos, the top two punched with hand-cut holes and stacked over
the third, with warm textured shadows and a magazine-print grain; click for a new set; 11 punch shapes that
re-punch the photos on screen; favorites that keep the exact holes and shape, with thumbnails and export/import;
a loading indicator; a high-quality JPG download of the collage on screen; an About panel with credits and links
to the photos on screen; a punched-paper link preview card; deployed as a Cloudflare Worker from
github.com/jrochfo/nibble.

## How these were measured
- Git: `git rev-list --count HEAD`, `git log --shortstat`, `wc -l`, `git ls-files`
- Session log: `~/.claude/projects/-Users-jrochford/2ada0ad8-7e60-4c4d-aac6-af380a01470b.jsonl`
  (timestamps, per-call token usage, tool calls)
