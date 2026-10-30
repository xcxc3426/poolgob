# Twelve views of the same evidence

The research images are 1600 × 1040 PNGs, produced by `capture.mjs`. They use the default PLINK case at requested tick 32 and an 8 SOL nominal ticket. Every number and plotted trace comes from the reference fixture and implemented analysis.

| View | Image | What it makes inspectable |
|---|---|---|
| Watchroom | [01](01-watchroom.png) | Reserve trace, tagged-event strip, measured findings and eight-pool watchlist |
| Pool anatomy | [02](02-anatomy.png) | Reserve ratio, liquidity index and execution assumptions |
| Exit surface | [03](03-surface.png) | Ticket-size versus remaining-depth friction matrix |
| Holder lens | [04](04-holders.png) | Eligible ranks, HHI, cohort shares and excluded rows |
| Change ledger | [05](05-ledger.png) | Source-tagged swaps and LP changes |
| Case file | [06](06-case.png) | Rule findings and observation references |
| Time replay | [07](07-replay.png) | Earlier and selected observations under a declared sizing convention |
| Alert desk | [08](08-alerts.png) | Cross-pool rule measurements and thresholds |
| Pool atlas | [09](09-atlas.png) | Comparable modeled exits with stale pools omitted |
| Feed desk | [10](10-feeds.png) | Requested versus observed clocks and withholding |
| GrokBot handoff | [11](11-handoff.png) | One prepared operator role and its file contract |
| Evidence receipt | [12](12-receipt.png) | Exact case digest and local attestation scope |

## How they were made

The native renderer invokes the same Canvas drawing functions as the browser interface. It checks text boundaries and writes PNG files directly. These are application-generated figures, not browser captures and not screenshots of Grok Bot's application.

Character artwork was generated separately and is identified in [provenance](PROVENANCE.md). It is not model output or a representation of hidden market signals.

## Share and inspect

Use the full PNGs for readable labels. Keep the synthetic-data footer and caption context when sharing a numerical view. The code-composed cover is 1600 × 800 and suits a repository social preview.

See [reproducibility](REPRODUCIBILITY.md) for the optional renderer and fonts. GitHub paths are case-sensitive; the entire assets folder belongs beside the root README.
