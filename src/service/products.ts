import path from "path";
import fs from "fs";

const dbPath = path.join(process.cwd(), "./src/database/db.json");

export const getProducts = () => {
    const products = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(products);
}