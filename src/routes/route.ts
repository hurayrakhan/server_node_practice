import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/productController";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url || "/";
  const method = req.method || "GET";
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "welcome to the node server!" }));
  } else if (url.startsWith("/products") && method === "GET") {
    productController(req, res);
  }
  else if (url === "/products" && method === "POST") {
    productController(req, res);
  }
  else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "not found" }));
  }
};
