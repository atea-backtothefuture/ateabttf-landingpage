# Cloudflare setup checklist

This repo currently deploys:

- `apps/web` as a Cloudflare Pages project
- `apps/api` as a Cloudflare Worker
- `apps/api/migrations/*` into one Cloudflare D1 database

This repo does not currently bind R2, KV, Durable Objects, or Queues in Wrangler or GitHub Actions, so you do not need to create those yet for this scaffold.

## Create these Cloudflare resources

### 1) D1 database

Create one D1 database for the API.

- Simplest prod-only name: `atta-bttf-volunteering`
- Suggested split names:
  - dev: `atta-bttf-volunteering-dev`
  - prod: `atta-bttf-volunteering-prod`

You must provide back:

- D1 `atta-bttf-volunteering-dev`
- D1 `afae21d2-9d57-4e79-b5f5-d9dbd3bc570e`

## 2) Worker and API hostname

Create or reserve the Worker deployment for the API.

- Simplest prod-only Worker name: `atta-bttf-api`
- Suggested split names:
  - dev: `atta-bttf-api-dev`
  - prod: `atta-bttf-api-prod`

If you want a custom API hostname, create the DNS/route target in the Cloudflare zone.

- Suggested dev API hostname: `api-dev.<your-domain>`
- Suggested prod API hostname: `api.<your-domain>`

You must provide back:

- Worker `name`
- API route `pattern` (example: `api.example.com/*`)
- API `zone_name` (example: `example.com`)
- Final API base URL used by the web app (example: `https://api.example.com`)

## 3) Pages project for the frontend

Create one Pages project for the web app.

- Simplest prod-only project name: `atta-bttf-web`
- Suggested split names:
  - dev: `atta-bttf-web-dev`
  - prod: `atta-bttf-web-prod`

You can use the default `*.pages.dev` hostname or attach a custom domain.

- Suggested dev hostname: `atta-bttf-web-dev.pages.dev` or `dev.<your-domain>`
- Suggested prod hostname: `atta-bttf-web.pages.dev` or `<your-domain>`

You must provide back:

- Pages project name
- Pages hostname actually serving the site
- Custom frontend domain, if you attach one

## 4) Cloudflare account access for GitHub Actions

Add these GitHub repository secrets before enabling deploys:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Recommended API token scope for this repo:

- Workers Scripts / Edit
- Workers Routes / Edit
- D1 / Edit
- Pages / Edit
- Account scope limited to the target Cloudflare account
- Zone scope limited to the zone that serves the API hostname, if you use a custom domain

You must provide back:

- `CLOUDFLARE_ACCOUNT_ID`
- Confirmation that `CLOUDFLARE_API_TOKEN` is created and stored in GitHub

## Config values this repo needs

Send back every value in this checklist so the remaining placeholders can be replaced safely:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN` added in GitHub secrets
- API Worker name
- D1 database name
- D1 database ID
- Pages project name
- API route pattern
- API zone name
- Web/API production base URL for `VITE_PUBLIC_API_BASE_URL`
- Web origin for API `CORS_ORIGIN`
- Frontend hostname or custom domain

## Exact placeholders currently waiting on your values

These files are the ones that need the values above:

- `apps/api/wrangler.jsonc`
  - `name`
  - `routes[0].pattern`
  - `routes[0].zone_name`
  - `vars.CORS_ORIGIN`
  - `d1_databases[0].database_name`
  - `d1_databases[0].database_id`
- `apps/web/wrangler.jsonc`
  - `name`
  - `vars.PUBLIC_API_BASE_URL`
- `apps/web/.env.local` or Cloudflare Pages build variables
  - `VITE_PUBLIC_API_BASE_URL`
- `.github/workflows/deploy-cloudflare.yml`
  - D1 migration database name in `wrangler d1 migrations apply ...`
  - Pages project name in `pages deploy ... --project-name ...`

## Practical recommendation for this repo

If you only want one production environment right now, create exactly these names to minimize follow-up edits:

- D1 database: `atta-bttf-volunteering`
- Worker: `atta-bttf-api`
- Pages project: `atta-bttf-web`
- API hostname: `api.<your-domain>`

Then provide back:

- your root domain / zone name
- your API hostname
- your frontend hostname
- your D1 database ID
- your Cloudflare account ID

## Local and build-time frontend config

The React app currently reads `VITE_PUBLIC_API_BASE_URL` at build time.

- For local development, copy `apps/web/.env.example` to `apps/web/.env.local`
- For Cloudflare Pages builds, add `VITE_PUBLIC_API_BASE_URL` as a Pages environment variable
- Recommended production value: `https://api.<your-domain>`
