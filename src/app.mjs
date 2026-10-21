import http from "node:http";

export const version = process.env.APP_VERSION ?? "dev";

export function healthBody() {
  return JSON.stringify({ status: "ok", version });
}

export function homeHtml() {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Release Demo – KV</title>
  </head>
  <body>
    <main>
      <h1>Release Demo – KV</h1>
      <p>Version: <span data-testid="app-version">${version}</span></p>
    </main>
  </body>
</html>`;
}

export function createServer() {
  return http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/health") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(healthBody());
      return;
    }

    if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.end(homeHtml());
      return;
    }

    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "not_found" }));
  });
}
