import type { IncomingMessage, ServerResponse } from "http";
import { getProducts } from "../service/products";

export const productController = (req: IncomingMessage, res: ServerResponse) => {
    
    const url = req.url || "/";
    const method = req.method || "GET";

    if (url === "/products" && method === "GET") {

        res.writeHead(200, { "content-type" : "application/json"})
        res.end(JSON.stringify({ message: "list of products" , data :  getProducts()}));

    }
    else {

        res.writeHead(404, { "content-type" : "application/json"})
        res.end(JSON.stringify({ message: "not found" }));

    }
}
