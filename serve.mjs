import { createServer } from "node:http";
import server from "./dist/server/server.js";

const port = parseInt(process.env.PORT || "10000");

createServer(async (req, res) => {
  try {
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