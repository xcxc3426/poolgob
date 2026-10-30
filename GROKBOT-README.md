# Poolgob / Grok Bot operator pack

One named operator, a stable watchlist and a source-bounded research note.

## Files

| File | Purpose |
|---|---|
| [OPERATOR.md](GROKBOT-OPERATOR.md) | Poolgob's role and research discipline |
| [WATCHLIST-ROUTINE.md](GROKBOT-WATCHLIST-ROUTINE.md) | Repeatable watchlist-pass instruction |
| [CASE-BRIEF.md](GROKBOT-CASE-BRIEF.md) | A single attributed case note |
| [pack.json](GROKBOT-pack.json) | Project-owned artifact metadata |

## First setup

Create a named Poolgob Bot through Grok Bot's normal account flow. Give it the operator instructions and a case packet exported from the local desk. Use the supplied case-brief instruction for one manual pass.

Ask it to return `research-note.md` with observation IDs, the model and sizing convention, findings, assumptions and unresolved gaps. Compare that note against the packet before reusing the method.

The official product supports persistent context and file-based tasks. This repo defines the role, files and output contract. See [official references](SOURCES.md) for the checked product documentation.

## A useful first message

> Use the Poolgob operator role and attached case.json. Prepare research-note.md. Preserve the synthetic-data label, source IDs, holder denominator and quote freshness. Explain the measured changes and the model assumptions in a concise note. Return the file and a short summary of unresolved gaps.

## Make the method repeatable

After one correct result, ask Grok Bot to save the method as a reusable skill. Adapt the watchlist routine to an explicitly chosen source directory, cadence and time zone. Confirm those settings in the user's account.

Adding this pack to GitHub does not create an account connection or register a routine. The local packet state remains `prepared`; provider-side work occurs in the configured Grok Bot conversation.

## Context ownership

Keep durable preferences with the named operator: watchlist, note format and recurring unresolved questions. Keep current observations and evidence in task folders. Reopen the current case before making a time-sensitive statement.

The pack is independent project material. It includes no provider SDK, secret, wallet, access token or claimed official affiliation.
