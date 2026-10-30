# Upload Poolgob: one folder, one selection

This edition contains **91 files in one folder, with no subfolders**. All images, documentation, source modules, examples and tests are beside `README.md`.

## Fix your existing repository

1. Extract **Poolgob-Single-Folder.zip**.
2. Open the extracted **poolgob** folder. You should immediately see `README.md`, `poolgob.png`, `01-watchroom.png` and the other files.
3. In your GitHub repository, choose **Add file → Upload files**.
4. Choose the files from inside that folder. Press **Ctrl+A** to select all files, then open them. You can also drag all selected files onto the upload area.
5. Confirm that the upload lists the images and `README.md` directly, without an extra `poolgob/` prefix.
6. Commit with: **Fix Poolgob images and package all files at repository root**.

Upload the files inside the folder. Do not upload the ZIP itself or the outer folder. The new root files replace matching paths from the previous upload; the numbered PNGs and other missing files are added.

The previous upload already had root files such as `README.md` and `package.json`. Include their new versions too: the updated README uses root-level image paths, and the source edition uses the new flat filenames.

## Confirm the images

At the repository root, open `poolgob.png`. Then return to the README: the logo, cover and twelve figures should appear.

| Image | Exact README path |
|---|---|
| Pixel goblin | `poolgob.png` |
| Cover | `poolgob-cover.png` |
| Watchroom | `01-watchroom.png` |
| Exit surface | `03-surface.png` |
| All remaining views | Other numbered PNGs from `02-anatomy.png` to `12-receipt.png` |

The paths are case-sensitive. Keep their supplied names. This package contains 14 PNGs: one logo, one cover and twelve research views.

## Repository details

**Name:** `poolgob`

**Description:** A quiet observer of Solana's small token pools. Liquidity replay, exit surfaces, source-linked findings and a persistent Grok Bot research workflow.

**Initial commit for a new repository:** Introduce Poolgob: liquidity leaves a trail

**Update commit for your current repository:** Fix Poolgob images and package all files at repository root

Suggested topics: `poolgob`, `solana`, `liquidity`, `grokbot`, `market-research`, `simulation`, `reproducibility`.

## Run it locally

Open `Poolgob.html` for the self-contained offline edition. For the source edition, use Node.js 20+ and run `npm start` from this folder. GitHub's source-file page does not run HTML as an application.

`npm test`, `npm run check` and `npm run verify` work from the same directory. Every shipped file stays at the root. Prefixes such as `core-`, `view-`, `GROKBOT-` and `test-` keep related material recognizable.

## Optional GitHub automation templates

`github-check.yml`, `BUG-REPORT.md`, `STUDY-REQUEST.md` and `PULL_REQUEST_TEMPLATE.md` remain readable reference templates in this flat package. They are not active GitHub automation at root. If you later want native GitHub Actions or issue templates, install them in GitHub's standard `.github` locations. That step is optional and not needed for the images, application or local checks.

## Later edits

Keep the same names and upload changed files at the same root paths. After changing inputs or code, regenerate derived outputs, review them, run the checks, and refresh `MANIFEST.sha256` with `node manifest.mjs`.
