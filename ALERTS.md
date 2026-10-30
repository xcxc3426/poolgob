# Transparent attention rules

Queue states describe configured conditions, not investment conclusions. `quiet` means none fired, `observe` means a lower-priority measurement crossed its threshold, and `review` means at least one review condition fired.

| Rule ID | Exact condition | Input |
|---|---|---|
| `stale-input` | Requested tick minus observed tick > 1 | Latest observation at or before the cutoff |
| `lp-removal` | Combined tagged removal fraction >= 0.15 | Last eight available observations |
| `cohort-concentration` | Eligible top-ten share > 0.55 | Classified holder cohort |
| `exit-friction` | All-in modeled shortfall > 0.05 | Fresh single-pool quote |

## Removal arithmetic

For tagged fractions `r_i`, the combined effect is `1 - product(1 - r_i)`. This describes gross multiplicative removal events within the selected window. It does not net LP additions or identify who removed liquidity.

The generator provides event tags. A real adapter cannot infer the same classification merely from a reserve falling.

## Stale data

The freshness budget is one simulated tick, or five minutes in this dataset. An age of exactly one tick is allowed. An age greater than one withholds the quote and exit surface, while retaining the pool and its stale-input finding.

That value is a replay-study setting. It is not a recommended production freshness budget for Solana execution.

## Interpretation

An observation finding and a review finding can coexist. Queue state takes the highest level. The record retains each measured value and source ID so the reason can be inspected independently of its color.

Rules are deliberately simple and disclosed. They are not a trained risk score, rug classifier, credit rating or trading recommendation. Change thresholds only with a declared experiment and a clear comparison plan.
