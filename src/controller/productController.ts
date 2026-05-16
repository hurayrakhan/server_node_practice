import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, getProducts } from "../service/products";
import { parse } from "path";
import { parseBody } from "../utility/parseBody";
import { json } from "stream/consumers";
import type { Product } from "../types/products.types";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
    const url = req.url  || "/";
    const method = req.method;

  const urlParts = url?.split("/");
  const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  const products = getProducts();


  if (url === "/products" && method === "GET") {  


    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "list of products", data: products }));

  } else if (method === "GET" && id !== null) {
    const products = getProducts();
    const product = products.find((p : Product) => p.id === id);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Product by ID", result: product }));

  }
  else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);

    console.log("request body", body);

    const newProduct = {
        id: Date.now(),
        ...body
    };

    const products = getProducts();
    products.push(newProduct);
    createProduct(JSON.stringify(products));
    res.writeHead(201, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Product created", data: newProduct }));
    
  }
  else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Products not found" }));
  }
};
