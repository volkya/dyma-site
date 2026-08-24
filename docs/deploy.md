# CI/CD — Site (Hugo + Cloudflare Pages)

## How it is wired

```
push to main / PR
        │
        ├─► GitHub Actions (CI)     → does it build? check ✅/❌ on the commit
        │
        └─► Cloudflare Pages (CD)   → build + publish *.pages.dev
```

- **CI** = `.github/workflows/ci.yml` (validate only).
- **CD** = Cloudflare Pages connected to this repo (publish).
- No GitHub deploy workflow: Pages already watches the repo.

| Piece | Value |
|--------|--------|
| Generator | **Hugo** (extended) |
| Hugo version | **0.147.9** (`HUGO_VERSION`) |
| Build output | `public` |

This repo **replaces** the Angular portfolio on Cloudflare. Keep `Volkya/portfolio` on GitHub as archive; do not point Pages at it anymore.

---

## 1. Local

```bash
hugo version    # extended, ≥ 0.146
hugo server -D  # http://127.0.0.1:1313/
hugo --gc --minify
```

`public/` is generated. Do not commit it.

---

## 2. GitHub Actions (CI)

On each push/PR to `main`/`master`:

1. Checkout
2. Hugo 0.147.9 extended
3. `hugo --gc --minify`

Runs: repo → **Actions**. A red check means this job failed; the live Pages site can still be up.

---

## 3. Cloudflare Pages (CD)

Reuse the existing Pages project (`dymacorrea` → `https://dymacorrea.pages.dev/`) so the URL stays the same.

Pages → project → **Settings** → **Builds**:

| Field | New value (Hugo) | Old value (Angular) |
|--------|------------------|---------------------|
| Git repository | this repo (`dyma-site`) | `Volkya/portfolio` |
| Framework preset | Hugo | None |
| Build command | `hugo --gc --minify` | `npx -y yarn@1.22.22 install --frozen-lockfile && npx -y yarn@1.22.22 build` |
| Build output directory | `public` | `dist/portfolio` |
| Root directory | `/` | `/` |
| Production branch | `main` | `main` |

**Environment variables**

| Name | Value | Action |
|------|--------|--------|
| `HUGO_VERSION` | `0.147.9` | add |
| `NODE_VERSION` | `22` | remove (Angular leftover) |
| `SKIP_DEPENDENCY_INSTALL` | `true` | remove (Angular leftover) |

Then **Retry deployment** (or push to `main`).

You do **not** need to delete the Pages project. Changing the connected repo + build settings is enough. The Angular site goes offline on this domain as soon as the Hugo build succeeds.

PRs can still get preview URLs if previews are enabled.

---

## 4. When something fails

| Symptom | Where to look |
|---------|----------------|
| ❌ on the GitHub commit | Actions → `build` log |
| Site not updating / red build in CF | Pages → Deployments → Build log |
| Wrong site still live | Pages still connected to `Volkya/portfolio` |
| Empty / old HTML | Output dir still `dist/portfolio` instead of `public` |
