# Architecture

| Layer | Module | Owns |
|---|---|---|
| Synthetic observations | `core-fixture.mjs` | Eight seeded pool histories and classified cohort rows |
| Quote model | `core-amm.mjs` | Token-to-SOL exit and proportional-depth stress |
| Cohort model | `core-holders.mjs` | Explicit denominator, ranks and HHI |
| Findings | `core-analysis.mjs` | Time cutoff, freshness, rules and source references |
| Receipt | `core-receipt.mjs` | Exact case encoding and local SHA-256 digest |
| View state | `view-state.mjs` | Selected pool, clock, ticket and computed case |
| Figures | `view-screens.mjs` | Twelve data-driven compositions |
| Browser | `view-app.mjs` | Controls and local downloads |
| Operator pack | `GROKBOT-OPERATOR.md` and `GROKBOT-pack.json` | User-configured research workflow |

## One analysis pass

Select frames at or before the requested tick. Choose the latest eligible observation. Evaluate its age, build the classified holder lens, inspect tagged events in the lookback, and compute an exit only if the observation is within the freshness budget. Every finding retains source IDs from that selected history.

The case packet includes the current snapshot, model version, ticket, findings, source IDs and operator handoff metadata. Receipt generation serializes that case and hashes its exact compact JSON bytes.

## State ownership

Fixture generation creates the reference data. Analysis functions read it without modifying snapshots. The browser stores a selected view and creates a fresh analysis when the pool, clock or ticket changes. A request-generation counter prevents an older asynchronous digest result from replacing a later control selection.

The rendering layer receives prepared analysis. It does not add independent prices, invented findings or a separate quote formula.

## Two build routes

The modular source interface reads data and modules through a loopback server. The standalone builder embeds the same modules in explicit dependency order with the logo and compact dataset. It is a small repository-specific bundler, not a general JavaScript transformation system.

## External boundaries

The local engine does not call a provider or submit a transaction. Grok Bot receives a case through the user's configured file workflow. The supplied pack names artifacts and expectations; it does not fabricate a provider receipt or install a routine merely because a file exists in the repo.
