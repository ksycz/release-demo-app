import assert from "node:assert/strict";
import test from "node:test";
import { healthBody, homeHtml } from "../src/app.mjs";

test("healthBody includes ok status and version from env", () => {
  const body = JSON.parse(healthBody());
  assert.equal(body.status, "ok");
  assert.ok(typeof body.version === "string");
});

test("homeHtml exposes version for smoke tests", () => {
  const html = homeHtml();
  assert.match(html, /data-testid="app-version"/);
  assert.match(html, /<h1>Release Demo<\/h1>/);
});
