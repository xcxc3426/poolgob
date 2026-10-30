# Contribute evidence, not a hidden assumption

Read [methods](METHODS.md), [the model](AMM-MODEL.md) and [data contracts](DATA-CONTRACTS.md) before changing the analytical layer.

## Calculation changes

Declare which units, model or comparison convention changes. Preserve independent analytical examples and monotonicity tests. A new pool type needs a new model identifier and its own execution arithmetic, not a silent reuse of the constant-product formula.

## Data changes

Keep source origin, time cutoff and classification scope explicit. Do not replace fictional aliases with plausible live addresses merely to make a screenshot look deployed. New external inputs should be timestamped, attributed and tested for missing and stale data.

## Findings

Keep each rule's measurement and source IDs inspectable. Report threshold changes as research changes. Quiet state is not a safety claim; a classification sensitivity result is not ownership evidence.

## Visual changes

Draw exact numbers and charts from code. Preserve the original goblin identity and the separation between reserve flows, LP events, cohort membership and quote assumptions. Include a rendered figure for substantive layout changes.

## Before submitting

```sh
npm run data
npm run studies
npm run build
npm test
npm run check
```

Regenerate affected PNGs when rendering changes. Inspect them, refresh the manifest after intentional changes, and describe the exact validation performed. Avoid committing provider credentials, wallet data or unrelated local exports.
