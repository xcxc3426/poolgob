# Observation and case contracts

## Dataset

The dataset identifies itself as `poolgob/dataset/1`, with `origin: synthetic-fixture`, a seed, a five-minute simulated tick and eight pool histories. Pool IDs begin with `sim-`; wallet aliases are descriptive fictional row IDs.

Each snapshot contains a strictly increasing tick, a relative time label, model identifier, reserves, input fee, liquidity index, swap notional, event list, holder cohort and source label. Snapshot IDs such as `plink-032` resolve within the selected pool's history.

The generator creates observation examples, not a complete token ledger. The holder cohort is a stylized independently generated balance distribution; it does not reconstruct every transfer behind the reserve history.

## Event types

| Type | Meaning in this replay |
|---|---|
| `lp-remove` | Known proportional reduction in both reserves |
| `lp-add` | Known proportional addition to both reserves |
| `swap-buy` | Modeled SOL input, token output |
| `swap-sell` | Modeled token input, SOL output |

`volumeSOL` is a marked swap-input notional. A sell's token input is valued at the pre-swap mid; this field is not the same as exact SOL output. The chart should be read as a notional activity strip.

## Case packet

`poolgob/case/1` includes the selected source snapshot, requested and observed ticks, nominal ticket, quote or null, local findings, holder scope and source IDs. It is marked `prepared` for a user-managed Grok Bot handoff.

Findings identify a rule, queue level, reason, measured value, unit and source references. The case contains no fabricated external transaction signature or provider completion status.

## Receipt

`poolgob/receipt/1` wraps the case with its declared encoding, SHA-256 digest and local unsigned attestation label. Digesting the case rather than the wrapper avoids self-reference.

## Future external observations

An external adapter should preserve chain identity, observation slot, commitment, retrieval time, provider provenance, pool-program identity, precise base units, token extensions and classification evidence. Largest-account lists must not be presented as a complete holder census.

This release's loader accepts its declared synthetic dataset contract. A live adapter needs an explicit new normalization path and tests; there is no hidden provider URL behind the fixture.
