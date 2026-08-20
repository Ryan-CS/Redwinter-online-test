# RED Winter Online Test

Split test deployment for RED Winter:

- GitHub Pages serves the static frontend from `public/`.
- Cloudflare Workers serves the dynamic API from `src/index.js`.
- The frontend calls the Worker at `https://redwinter-online-test.ryan-skogstad.workers.dev`.

## Project layout

- `public/` — static frontend published by GitHub Pages.
- `src/index.js` — Cloudflare Worker API.
- `.github/workflows/pages.yml` — automatic GitHub Pages deployment from `main`.
- `wrangler.jsonc` — API-only Worker configuration.
- `package.json` — local Worker development/deployment commands.

## Cloudflare Worker API

Install dependencies and run locally:

```bash
npm install
npm run dev
```

Deploy manually with:

```bash
npm run deploy
```

Cloudflare Git integration can also deploy the Worker automatically from `main` using `npx wrangler deploy`.

Current demo endpoint:

```text
GET https://redwinter-online-test.ryan-skogstad.workers.dev/api/demo
```

The Worker permits browser CORS requests from:

- `https://www.redwinter.online`
- `https://redwinter.online`
- `https://ryan-cs.github.io`

## GitHub Pages frontend

The workflow in `.github/workflows/pages.yml` publishes the contents of `public/` whenever frontend files change on `main`.

After merging this branch:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Run or wait for the **Deploy GitHub Pages** workflow.
5. GitHub will publish the site on the repository's Pages URL.

For a custom hostname, set `www.redwinter.online` as the GitHub Pages custom domain. GitHub will show the DNS target to use. In GoDaddy, add the `www` CNAME exactly as GitHub specifies, typically pointing to the account Pages hostname such as `ryan-cs.github.io`.

Do not point `www` at the `workers.dev` hostname. The Worker is the API backend, not the static-site DNS target.
