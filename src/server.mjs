import { createServer, version } from "./app.mjs";

const port = Number(process.env.PORT ?? 8080);
const server = createServer();

server.listen(port, () => {
  console.log(`release-demo listening on :${port} (version=${version})`);
});
