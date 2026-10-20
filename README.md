# release-demo-app

## What this app does

This is a **deliberately tiny web service** — not a product. It exists so you can practice **Docker**, then deploy it with **Argo CD** and promote it with **Kargo** using the companion repo [release-demo-gitops](https://github.com/ksycz/release-demo-gitops).

When the server is running it:

1. **Shows a version on a web page** — open `/` in a browser and you see a heading and the current version string (from the `APP_VERSION` environment variable).
2. **Answers health checks** — `GET /health` returns JSON with `"status": "ok"` and the same version. Kubernetes liveness/readiness probes and smoke tests after a promotion can call this URL.
3. **Returns 404 for anything else** — only `/`, `/index.html`, and `/health` are implemented.

There is no database, login, or business logic. The interesting part of the portfolio is **how new versions get built, shipped, and verified** — each new container image should change the version you see on `/` and in `/health`, so you can confirm that dev, staging, or prod is running the release you expect.

Version is injected at **build time** (Docker `ARG` / CI) and at **runtime** (env var in the container). Same value in both places keeps the UI and health JSON in sync.

## Endpoints

| Path | Description |
|------|-------------|
| `GET /` | HTML page with visible app version (`data-testid="app-version"` for tests) |
| `GET /health` | JSON `{ "status": "ok", "version": "..." }` |

## Local development

```bash
npm test
APP_VERSION=local npm start
# open http://localhost:8080
curl -s http://localhost:8080/health
```

## Docker

```bash
docker build --build-arg APP_VERSION=0.1.0-local -t release-demo:local .
docker run --rm -p 8080:8080 release-demo:local
```

## CI

On push to `main`, GitHub Actions runs tests and pushes the container image to **ghcr.io** (`ghcr.io/ksycz/release-demo-app`).

Tag pushes (`v*.*.*`) publish semver image tags for Kargo Freight.

## Related repo

**[release-demo-gitops](https://github.com/ksycz/release-demo-gitops)** — Helm, Argo CD, and Kargo manifests go there as you add them.
