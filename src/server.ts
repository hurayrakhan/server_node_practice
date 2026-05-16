import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server : Server  = createServer((req: IncomingMessage, res: ServerResponse) => {
    const url = req.url || "/";
    if (url === "/") {
        res.writeHead(200, { "content-type" : "application/json"})
        res.end(JSON.stringify({ message: "welcome to the node server!" }));
    }
    else if (url === "/hello") {
        res.writeHead(200, { "content-type" : "application/json"})
        res.end(JSON.stringify({ message: "hello world!" }));
    }
    else {
        res.writeHead(404, { "content-type" : "application/json"})
        res.end(JSON.stringify({ message: "not found" }));
    }
});

server.listen(8000, () => {
    console.log("Server is running on port 8000");
})