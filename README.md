# RED Winter Online Test

Cloudflare Workers test deployment for RED Winter. GitHub is the source of truth; Cloudflare Workers serves the frontend and API from one application.

## Project layout

- `public/` — static frontend assets.
- `src/index.js` — Worker application code and API routes.
- `wrangler.jsonc` — Cloudflare Workers + Static Assets configuration.
- `package.json` — local development/deployment commands.

## Local development

```bash
npm install
npm run dev
```

Open the local URL shown by Wrangler. The landing page calls `GET /api/demo` on the same origin.

## Manual deployment

```bash
npm install
npm run deploy
```

Wrangler will deploy both `public/` and `src/index.js` as one Worker application. The site can run entirely on the generated `workers.dev` hostname; no custom domain is required.

## Automatic deployment from GitHub

Cloudflare Workers Builds can deploy this repository automatically whenever `main` changes:

1. In Cloudflare, open **Workers & Pages**.
2. Choose **Create application** → **Import a repository**.
3. Connect GitHub and select `Ryan-CS/Redwinter-online-test`.
4. Use `main` as the production branch.
5. Cloudflare should detect `wrangler.jsonc`; the deploy command is `npx wrangler deploy`.
6. Save and deploy, then use the generated `*.workers.dev` URL.

After Git integration is enabled, pushes to the configured production branch trigger new builds/deployments automatically.

## Routing

Static files are served directly from `public/`. Requests matching `/api/*` invoke the Worker first. The demo endpoint is:

```text
GET /api/demo
```

This keeps frontend and backend on the same origin, so the demo API does not need CORS configuration.
