# DNS-AID deployment for sobol.ps

DNS for AI Discovery records live in the authoritative DNS zone, not in the
Next.js application. Publish these records only after the application changes
in this repository are deployed to `https://www.sobol.ps`.

The current DNS-AID specification is
`draft-mozleywilliams-dnsop-dnsaid-02` (27 May 2026). It is an active
Internet-Draft, not a finalized RFC, so recheck its current revision before
changing production DNS.

## Records

The application now provides a public discovery index through its homepage
`Link` headers and a read-only MCP endpoint at `/mcp`.

```dns
_index._agents.sobol.ps. 3600 IN SVCB 1 www.sobol.ps. mandatory=alpn,port alpn="h2,h3" port=443
_mcp._agents.sobol.ps.   3600 IN SVCB 1 www.sobol.ps. mandatory=alpn,port alpn="mcp,h2,h3" port=443
```

Do not publish `_a2a._agents.sobol.ps` unless an actual A2A endpoint is
deployed.

These records intentionally use only standardized SVCB parameters. If a future
DNS-AID revision requires experimental custom parameters, use their
`keyNNNNN` numeric names until IANA registers mnemonic names.

## Cloudflare procedure

1. Open the authoritative `sobol.ps` DNS zone.
2. Add the two Service Binding (SVCB) records above with DNS-only behavior.
3. Enable DNSSEC for the public zone.
4. Add the DS record at the `.ps` registrar if Cloudflare asks for registrar
   delegation.
5. Wait until Cloudflare reports DNSSEC as active.

## Verification

Query through a validating resolver and confirm the authenticated-data flag:

```text
dig +dnssec SVCB _index._agents.sobol.ps @1.1.1.1
dig +dnssec SVCB _mcp._agents.sobol.ps @1.1.1.1
dig +dnssec DNSKEY sobol.ps @1.1.1.1
```

Expected results:

- both SVCB queries return the configured ServiceMode records;
- the responses include RRSIG records;
- a validating resolver sets the `ad` flag;
- `https://www.sobol.ps/.well-known/mcp/server-card.json` returns HTTP 200;
- `https://www.sobol.ps/mcp` accepts the MCP initialization request.

Finally, rerun the Is It Agent Ready scan against
`https://www.sobol.ps`.
