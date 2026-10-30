# Concentration with a declared cohort

## Eligible and excluded rows

Each fixture observation includes 30 rows classified as `wallet`, one `pool-vault` and one `custody` row. The holder lens selects only `wallet` rows. `unknown` is a supported excluded category for sensitivity studies.

The denominator is the sum of eligible row balances. It is not total minted supply, circulating supply, independently owned supply or a census of all real holders.

For eligible balances `b_i` with sum `B`, each cohort share is `s_i = b_i / B`. Top-one and top-ten use the ranked shares. HHI is `sum(s_i²)` on a 0..1 scale; the interface does not multiply it by 10,000.

## Why classification is visible

A pool vault can hold a large token balance for reasons different from a private wallet. A custody account can represent many users. Excluding a row changes the denominator and must remain visible. The right-hand panel lists excluded aliases and classifications.

For the default PLINK observation, the eligible top-ten share rounds to 68.03%, top-one to 10.95% and HHI to 0.0576. These are measurements of the modeled cohort only.

## Accounts and identities

Solana's `getTokenLargestAccounts` returns large token accounts. That does not by itself establish unique wallet owners, complete supply coverage or independent human identities. A live adapter would need owner resolution, account classification evidence and explicit coverage metadata.

The fixture aliases are not blockchain addresses. Poolgob performs no deanonymization or inferred ownership clustering in this edition.

## Sensitivity

The cohort sensitivity study reclassifies one modeled row as unknown and recomputes the eligible denominator. It is a what-if experiment, not evidence that the row truly belongs to a different category. Compare the result and the changed membership together.
