# Cloudflare deployment notes

This repository is scaffolded for a two-app Cloudflare setup:

- `apps/web`: Cloudflare Pages frontend
- `apps/api`: Cloudflare Worker API backed by D1

## Files

- `apps/web/wrangler.jsonc`: Pages config and public runtime vars
- `apps/api/wrangler.jsonc`: Worker config, route placeholder, and D1 binding
- `apps/api/migrations/0001_initial_schema.sql`: initial schema for sessions, volunteer submissions, reviews, and video recommendations
- `.github/workflows/deploy-cloudflare.yml`: path-aware deploy pipeline

## Required GitHub secrets

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Keep secrets out of the repository. The `database_id`, route hostname, zone name, and Pages project values are placeholders until you create the real Cloudflare resources.

## First-time setup

1. Create the D1 database and replace `REPLACE_WITH_D1_DATABASE_ID` in `apps/api/wrangler.jsonc`.
2. Create the API route and replace `api.example.com` and `example.com` in `apps/api/wrangler.jsonc`.
3. Confirm the web origin in `CORS_ORIGIN` matches your deployed Pages hostname or custom domain.
4. Create the Pages project `atta-bttf-web`, or update the project name in both `apps/web/wrangler.jsonc` and `.github/workflows/deploy-cloudflare.yml`.
5. Add the GitHub secrets before merging deployment changes into `main`.

## Local development

- Copy `apps/api/.dev.vars.example` to `apps/api/.dev.vars`
- Copy `apps/web/.dev.vars.example` to `apps/web/.dev.vars`
- Run `pnpm dev:web` from the repo root for the frontend
- Run `pnpm dev:api` from the repo root for the Worker

## Recommended deployment pattern

- Let Codex update code, config, and workflow files
- Let GitHub Actions handle automatic deployments after review
- Use preview deploys or manual `wrangler` deploys only when you explicitly want them
