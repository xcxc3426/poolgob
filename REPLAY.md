# Replay boundaries

## Clock and information cutoff

The user selects a requested tick. Analysis filters each pool to snapshots whose ticks do not exceed it, then uses the latest remaining snapshot. No future event, holder row or reserve is included in that pool's case.

The requested tick and observed tick can differ. BLOOP stops at tick 30; at tick 32 the requested clock is T+02:40 while its observation remains T+02:30. The quote is withheld.

## Lookback

The tagged-event rule uses the last eight available observations after the time cutoff. These are observation counts, not an inferred fixed-duration chain window. A future irregularly sampled dataset should define a time-based window explicitly.

## Two comparison conventions

| View | What is held fixed | What changes |
|---|---|---|
| Exit surface | Token position and starting mid | Proportional reserve depth |
| Time replay | Nominal SOL ticket size | Snapshot mid, reserves and therefore token input size |

The time replay does not calculate fixed-position PnL. The depth surface does not predict future liquidity. Keeping the distinction visible prevents a sizing convention from becoming an apparent trading result.

## Reproducibility

Seed 29 generates the committed reference file. Each pool uses a separately initialized stream for reserve events; each holder snapshot has a deterministic stream. Requesting a different view does not change the generator or its draw consumption.

The complete reference fixture is shipped for inspection. Source cutoffs are enforced by analysis even though later fixture observations are present in the file.

## Exported evidence

A case contains the selected snapshot and source IDs for the selected history. The full dataset supplies the referenced earlier observations. Retain the dataset version alongside a case if moving it outside this repo.
