# Deployment

Doodle.day is intended to deploy as its own Cloudflare Pages project from its
own GitHub repository.

## GitHub Actions Deploy

The repo includes `.github/workflows/deploy.yml`, which deploys `main` to
Cloudflare Pages with Wrangler after running the production build.

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Cloudflare Pages project name:

```text
doodle-day
```

One-time Cloudflare setup:

```sh
npx wrangler pages project create doodle-day --production-branch=main
npx wrangler pages domain add doodle.day --project-name=doodle-day
```

You can also create the `doodle-day` Pages project and add the `doodle.day`
custom domain from the Cloudflare dashboard.

## Recommended Cloudflare Pages Settings

- Production branch: `main`
- Build command: `npm run build:production`
- Build output directory: `dist`
- Production domain: `doodle.day`

The production build writes generated pages with `https://doodle.day` canonical,
Open Graph, RSS, and sitemap URLs. Deploy `dist/`, not the repository root, so
private drafts, process plans, scripts, and agent notes are not published.

## Local QA

Cove serves the local checkout at:

```text
https://doodle.localhost/
```

Daily readiness checks should still run from the repository root:

```sh
python3 scripts/check-tutorial-readiness.py {slug}
```
