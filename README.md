# ATTA-BTTF Monorepo

Starter monorepo for a return-to-tech volunteering platform that supports:

- an 8-session program hub for women returning to IT careers
- volunteer and organizer coordination
- ATS-style resume and job description review
- Cloudflare deployment with Pages, Workers, D1, and R2

## Structure

- `apps/web` - React + Vite + TypeScript + Tailwind frontend
- `apps/api` - Cloudflare Worker API
- `docs/design-handoff` - screen checklist and sample session content
- `docs/infra` - Cloudflare setup notes
- `infra/docs` - scaffold notes

## Quick start

```bash
pnpm install
pnpm dev:web
```

## Next setup steps

1. Replace the placeholder values in `apps/api/wrangler.jsonc`.
2. Create the D1 database and R2 bucket in Cloudflare.
3. Add GitHub secrets before enabling the deploy workflow.
4. Expand the API and connect the web app to live data.
