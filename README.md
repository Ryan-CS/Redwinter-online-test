# RED Winter Online Test

Placeholder deployment for `redwinter.online`, designed for Cloudflare Workers + Static Assets.

## What is here

- `index.html` — lightweight mirror of the current RED Winter landing page structure.
- `worker.js` — Cloudflare Worker with a demo `GET /api/demo` JSON endpoint.
- `wrangler.toml` — Worker/static-assets configuration.

## Local/deploy flow

1. Install Wrangler: `npm install -g wrangler` (or use `npx wrangler`).
2. Authenticate: `wrangler login`.
3. Run locally: `wrangler dev`.
4. Open the local URL and click **Call /api/demo**.
5. Deploy: `wrangler deploy`.
6. In Cloudflare, attach the intended custom domain/route to the Worker.
7. If DNS remains registered/managed at GoDaddy, create the DNS record Cloudflare requires for that custom hostname. If you instead move authoritative DNS to Cloudflare, update the domain's nameservers at GoDaddy to the Cloudflare nameservers.

## Notes

The live site currently links to Discord, REDash, and GitHub. This placeholder intentionally uses a simple generated RED badge rather than copying remote image assets, so the test deployment has no dependency on the production site's image hosting.
