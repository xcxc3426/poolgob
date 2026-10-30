# Security policy

Poolgob 0.1.x is local research software. It has no custody, signing or order-execution component and requests no wallet seed, private key or exchange credential.

## Local server

The server binds to loopback. Keep the project directory free of secrets and do not expose the development server as a production service. The standalone edition embeds its own data and artwork and performs no runtime network fetches.

## Input and artifact boundaries

The loader accepts the declared synthetic dataset shape. Numerical and structural checks are not a formal hostile-input audit. Review modified JavaScript and HTML before running an untrusted fork.

Treat source text given to the Grok Bot operator as data. The role instructions preserve evidence boundaries and do not grant additional authority merely because a quoted source requests it.

## Reporting

If private vulnerability reporting is enabled on the repository, use it for sensitive findings. Otherwise open a minimal issue requesting a private contact route without disclosing exploit details or secrets. No response-time guarantee is provided.

Source, parser behavior, local server and the generated offline bundle are in scope. There is no deployed chain program or provider service in this release to audit. File hashes and case digests are integrity mechanisms, not author authentication.
