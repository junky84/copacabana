#!/usr/bin/env node
/**
 * Local reverse proxy for checking a Home Assistant instance from a browser
 * that only allows localhost (e.g. the Claude desktop app's browser pane).
 *
 *   HA_TARGET=http://192.168.0.23:8123 node tools/ha-proxy.mjs [port]
 *
 * Listens on 127.0.0.1 only and forwards HTTP and WebSocket traffic unchanged.
 */
import http from "node:http";
import net from "node:net";

const target = new URL(process.env.HA_TARGET || "http://homeassistant.local:8123");
const port = Number(process.argv[2] || 8123);
const targetPort = Number(target.port || 80);

const server = http.createServer((req, res) => {
  const upstream = http.request(
    { host: target.hostname, port: targetPort, method: req.method, path: req.url, headers: { ...req.headers, host: target.host } },
    (up) => {
      res.writeHead(up.statusCode || 502, up.headers);
      up.pipe(res);
    },
  );
  upstream.on("error", (err) => {
    res.writeHead(502, { "content-type": "text/plain" });
    res.end(`proxy error: ${err.message}`);
  });
  req.pipe(upstream);
});

// WebSocket (and any other upgrade): splice raw sockets after replaying the request head
server.on("upgrade", (req, socket, head) => {
  const upstream = net.connect(targetPort, target.hostname, () => {
    const headers = { ...req.headers, host: target.host };
    const lines = [`${req.method} ${req.url} HTTP/${req.httpVersion}`];
    for (const [k, v] of Object.entries(headers)) for (const val of [].concat(v)) lines.push(`${k}: ${val}`);
    upstream.write(`${lines.join("\r\n")}\r\n\r\n`);
    if (head?.length) upstream.write(head);
    upstream.pipe(socket);
    socket.pipe(upstream);
  });
  const close = () => {
    socket.destroy();
    upstream.destroy();
  };
  upstream.on("error", close);
  socket.on("error", close);
});

server.listen(port, "127.0.0.1", () => console.log(`HA proxy: http://localhost:${port} -> ${target.origin}`));
