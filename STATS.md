# Nibble: project stats

Snapshot taken 2026-10-11, when the project went live at nibble.pictures.

## Time
- Elapsed: ~1 hour 54 minutes (2026-10-11 14:55 → 16:49, US Central)
- Active work: the same ~1 hour 54 minutes, with no gap over 20 minutes; idea to live domain in one sitting

## Conversation and compute
- Messages from Jake: ~37
- Model calls: 155, all Claude Opus 5.5
- Tool uses: 121 (98 shell commands, 21 file/screenshot reads, 2 file writes)
- Tokens (≈ ¾ of a word each):
  - Output written: ~150,000
  - Cache reads: ~23.8 million (each step re-reads the conversation so far)
  - Cache writes: ~220,000
- One session, no context compactions

## Code
- 3 commits, all at the end (the site was built outside git as numbered steps, then committed once finished)
- 780 lines: `index.html` 620, `favorites.js` 160
- 3 site files, about 38 KB in total, no build step and no dependencies
- 7 tracked files (including this one)

## Content
- 14 numbered steps explored before settling, archived locally in `steps-archive/` (not in git)
- 11 punch shapes: circle, square, triangle, star, heart, sakura, strawberry, apple, butterfly, umbrella, candy
- 3 photos per set, 40 holes per punched sheet, 2 shadows per sheet (tight contact + wide ambient)

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

## Shipped
nibble.pictures: three random Wikimedia Commons photos, the top two punched with hand-cut holes and stacked over
the third, with warm textured shadows and a magazine-print grain; click for a new set; 11 punch shapes that
re-punch the photos on screen; favorites that keep the exact holes and shape, with thumbnails and export/import;
a loading indicator; an About panel with credits and links to the photos on screen; deployed as a Cloudflare
Worker from github.com/jrochfo/nibble.

## How these were measured
- Git: `git rev-list --count HEAD`, `wc -l`, `git ls-files`
- Session log: `~/.claude/projects/-Users-jrochford/2ada0ad8-7e60-4c4d-aac6-af380a01470b.jsonl`
  (timestamps, per-call token usage, tool calls)
