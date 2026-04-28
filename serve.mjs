import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname } from "node:path";
import server from "./dist/server/server.js";

const port = parseInt(process.env.PORT || "10000");
const clientDir = "./dist/client";

const mimeTypes = {
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

createServer(async (req, res) => {
  try {
    const filePath = join(clientDir, req.url.split("?")[0]);
    if (existsSync(filePath) && !filePath.endsWith("/")) {
      const ext = extname(filePath);
      const mime = mimeTypes[ext] || "application/octet-stream";
      const content = await readFile(filePath);
      res.writeHead(200, { "Content-Type": mime });
      res.end(content);
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
    });

    const response = await server.fetch(request);
    const headers = Object.fromEntries(response.headers);
    headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self' https:; worker-src 'self' blob:;";

    const body = await response.arrayBuffer();
    res.writeHead(response.status, headers);
    res.end(Buffer.from(body));
  } catch (err) {
    console.error("Request error:", err);
    res.writeHead(500);
    res.end("Internal Server Error");
  }
}).listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});