# release-demo-app

Minimal HTTP service for a GitOps portfolio demo. The **release-demo-gitops** repo starts empty; you add deployment tooling there as you learn.

## Endpoints

| Path | Description |
|------|-------------|
| `GET /` | HTML page with visible app version |
| `GET /health` | JSON `{ "status": "ok", "version": "..." }` |

Version comes from the `APP_VERSION` environment variable (set at image build time in CI).

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

On push to `main`, GitHub Actions runs tests and pushes the container image to **ghcr.io** (`ghcr.io/<owner>/release-demo-app` when this repo is named `release-demo-app`).

Tag pushes (`v*.*.*`) publish semver image tags for Kargo Freight.

## Related repo

**release-demo-gitops** — deployment manifests (Helm, Argo CD, Kargo) go there when you add them.
