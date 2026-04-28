import { createServer } from "node:http";
import { toNodeListener } from "h3";
import server from "./dist/server/server.js";

const port = parseInt(process.env.PORT || "10000");

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const request = new Request(url, {
    method: req.method,
    headers: req.headers,
  });
  
  const response = await server.fetch(request);
  
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(await response.text());
}).listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});