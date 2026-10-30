# The exit model

## Scope

`cpmm-demo-v1` is an idealized two-reserve constant-product model. It is useful for explaining depth and position size. It is not a byte-accurate implementation of Raydium, PumpSwap, a bonding curve, a concentrated-liquidity pool or a routing service.

The token reserve is `x`, the SOL reserve is `y`, gross token input is `q`, and input fee fraction is `f = feeBps / 10000`.

```text
mid = y / x
feeTokens = q × f
effectiveInput = q × (1 - f)
outputSOL = y × effectiveInput / (x + effectiveInput)
postX = x + q
postY = y - outputSOL
```

The full input remains in the modeled reserve. The fee-adjusted swap conserves the pricing relation while the stored product grows because of the retained fee. There is no protocol-fee split in this abstraction.

## Two different friction measurements

```text
curveImpact = effectiveInput / (x + effectiveInput)
nominalSOL = q × mid
allInShortfall = 1 - outputSOL / nominalSOL
```

Curve impact compares the effective-input execution average with the pre-quote mid. All-in shortfall uses gross input and therefore also includes the input fee. Their relationship is:

```text
allInShortfall = 1 - (1 - f) × (1 - curveImpact)
```

The heatmap uses all-in shortfall. It is neither a slippage-tolerance setting nor the change in the post-trade spot price. Network fees and transfer fees are absent.

## Nominal SOL tickets

A ticket of `S` SOL means a token position with `q = S / mid` at the selected snapshot. This is an input-sizing convention, not cash spent in a historical trade.

The depth surface scales both reserves by a fraction `r` in `(0,1]`, preserving the starting mid. It then quotes the same token position across each row. Larger positions and smaller depth produce greater curve friction in this model.

## Numeric example

With `x = 1000`, `y = 100`, `q = 100` and a 30 bps fee, the fee is 0.3 tokens and modeled SOL output is approximately 9.06610894. The tests independently check this example, fee accounting and the zero-fee invariant.

## Precision and execution

All arithmetic is JavaScript floating point. Production token amounts require exact base-unit arithmetic, model-specific rounding and token-program behavior. An execution adapter must validate its own formula and units rather than treating this research quote as a transferable on-chain result.

Primary background references are in [SOURCES.md](SOURCES.md); this repository's equations and assumptions are the implementation contract.
