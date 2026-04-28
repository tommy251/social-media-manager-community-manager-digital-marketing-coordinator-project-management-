import { createServer } from "node:http";
import { toNodeListener } from "h3";
import { defaultStreamHandler } from "./dist/server/server.js";

const port = parseInt(process.env.PORT || "10000");

createServer(toNodeListener(defaultStreamHandler)).listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});