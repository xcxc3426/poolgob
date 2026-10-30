# Start with an eight-SOL question

## Double-click edition

Extract the repository ZIP and open `Poolgob.html`. The file includes all data, code, styles and the logo. It needs no account, API key or server.

Start with PLINK / SOL, an 8 SOL ticket and tick 32. The quote reserve should round to 176.11 SOL and the modeled exit to 7.6304 SOL. Two findings should appear: tagged LP removal and cohort concentration.

## Source edition

Use Node.js 20 or newer. Open a terminal in the folder containing `package.json` and run `npm start`. Open `http://127.0.0.1:4173`. No install is needed for runtime or tests.

Do not open `index.html` as a local file: its modules and data load through the server. The self-contained `Poolgob.html` is the local-file route.

## Five useful checks

| Try | What to inspect |
|---|---|
| PLINK at tick 24, then 32 | The later tagged removal changes the pool's depth |
| Exit surface | A fixed token position receives different output across depth columns |
| Holder lens | The denominator excludes the modeled vault and custody rows |
| BLOOP at tick 32 | The stale quote and heatmap are withheld |
| Receipt export | The complete case is included with its local digest |

The frame slider selects the information cutoff. Views such as the atlas still compare all pools at that cutoff, while the focus pool selects the detailed case.

## Exports

The browser can download a 1600 × 1040 PNG, case JSON, receipt JSON or watchlist CSV. Exported case data retains its synthetic origin. The receipt digest uses compact JSON bytes; the downloadable receipt itself is pretty-printed for readability.

## If something looks wrong

For this edition, `poolgob.png`, `poolgob-cover.png` and all twelve numbered PNGs must be uploaded beside `README.md`. See [upload instructions](GITHUB-UPLOAD.md). A blank modular interface usually means the source page was opened without its server. A stale quote is a deliberate result, not a loading error.
