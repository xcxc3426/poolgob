# Reproduce Poolgob

## Standard-library commands

The prepared release was checked with Node.js 24.22.1. Source targets Node 20+. Runtime, tests, fixture generation, studies, receipts and the standalone build need no package installation.

```sh
npm run data
npm run studies
npm run build
npm test
npm run check
```

`npm run data` writes the eight-pool fixture and the three default examples. `npm run studies` writes the declared study results. `npm run build` embeds code, data, styles and the original mascot in `Poolgob.html`.

## Optional PNG rendering

```sh
npm install --no-save --package-lock=false @napi-rs/canvas
npm run screenshots
```

The renderer uses DejaVu Sans, DejaVu Sans Mono and DejaVu Sans Bold. Set `POOLGOB_FONT_DIR` to their directory if needed. Its default is `/usr/share/fonts/truetype/dejavu`. `POOLGOB_CANVAS_MODULE` can identify another installation of the same renderer.

The fonts and native renderer are not bundled. Browsers may use local font fallbacks, so browser pixels can differ from the prepared native PNGs even when the numbers agree.

## Dataset determinism

Seed 29 generates the checked-in reference. The integer random stream is deterministic, while exponential holder weights and quotes use floating-point math. Preserve the generated JSON when exact historical bytes matter. Do not promise cross-runtime bitwise equality for newly computed floating-point traces without checking the target environment.

## Integrity

`npm run verify` checks file coverage and SHA-256 hashes against `MANIFEST.sha256`. The manifest excludes itself and ignores local Git metadata and node_modules. After deliberate changes, regenerate derived files, inspect the result, run checks, and refresh with `node manifest.mjs`.

File integrity does not establish an author or the truth of observations. Case receipts use a separate documented encoding and can be checked with `node verify-case.mjs plink-receipt.json`.

## UI verification boundary

The test harness exercises offline boot, view selection, stale withholding, bad input and exports with a simulated DOM. It is not a real browser engine. Native figure rendering and text-boundary checks are additional checks; cross-browser layout and accessibility review remain separate manual tasks.
