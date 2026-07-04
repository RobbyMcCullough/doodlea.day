# Deployment

Doodlea.day deploys to the **Andromeda DigitalOcean droplet behind Caddy**, the
same way as its sister site Sketcha.day and the other static sites in this fleet.
See `~/Dropbox/AI/andromeda/AGENTS.md` for the canonical server/Caddy/DNS guide.

- **Server:** `deploy@138.68.248.95` (Ubuntu, Caddy)
- **Site path:** `/var/www/doodlea.day` — a git clone of
  `git@github.com:RobbyMcCullough/doodlea.day.git`
- **Served root:** the repository root (committed build output: `index.html`,
  `library.html`, `tutorials/`, `assets/`, `feed.xml`, `sitemap.xml`, etc.).
  Caddy serves the repo directly — there is **no** server-side build and **no**
  `dist/` step. Run the build locally and commit the generated files.

## GitHub Actions Deploy

`.github/workflows/deploy.yml` SSHes into the server on every push to `main` and
runs `git pull origin main` in `/var/www/doodlea.day`.

Required GitHub repository secrets:

- `SSH_HOST` — `138.68.248.95`
- `SSH_USER` — `deploy`
- `SSH_PRIVATE_KEY` — a deploy key whose public half is in the server's
  `~/.ssh/authorized_keys`

After the pull, the workflow submits the changed public pages to IndexNow
(Bing/Yandex same-day crawling) via `scripts/submit-indexnow.py`. The
ownership key file `f023b31d5eb90985c733e9c445dd2289.txt` at the repository
root is public by design and must stay committed. This step is
`continue-on-error` — an IndexNow hiccup never fails a deploy.

## Caddyfile block

```caddy
doodlea.day, www.doodlea.day {
    root * /var/www/doodlea.day
    encode gzip zstd
    file_server

    @static {
        path *.png *.jpg *.jpeg *.svg *.webp *.woff *.woff2 *.ico
    }
    header @static Cache-Control "public, max-age=31536000, immutable"
    @dynamic {
        not path *.png *.jpg *.jpeg *.svg *.webp *.woff *.woff2 *.ico
    }
    header @dynamic Cache-Control "public, max-age=600"
}
```

Caddy auto-provisions the TLS cert via Let's Encrypt once DNS points to the
server. DNS: `@` and `www` A records → `138.68.248.95` (grey-cloud first so the
cert can issue, then optionally orange-cloud).

## Build & QA before pushing

```sh
npm run build            # node scripts/build-tutorials.mjs — writes the public files to the repo root
python3 scripts/check-tutorial-readiness.py {slug}
```

Analytics: each page carries a self-hosted Plausible tag
(`data-domain="doodlea.day"`, `https://analytics.robbymccullough.com/js/script.js`).
The `data-domain` follows `SITE_URL`, so the default build reports under
`doodlea.day`.

## Local QA

Cove serves the local checkout at `https://doodlea.localhost/`.
