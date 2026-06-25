# Deployment

Doodle.day is intended to deploy as its own Cloudflare Pages project from its
own GitHub repository.

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
