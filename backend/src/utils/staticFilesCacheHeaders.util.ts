import path from "node:path";
import { Response } from "express";

const h1 = 60 * 60 * 1000;
const d1 = 24 * h1;
const d365 = 365 * d1;

function setStaticFilesCacheHeaders(res: Response, file: string) {
    if (path.extname(file) !== ".html") {
        let maxAge = d365;
        if (path.extname(file) !== "favicon.svg") {
            maxAge = d1;
        }
        res.setHeader("Cache-Control", `public, max-age=${maxAge}`);
    }
}

export { setStaticFilesCacheHeaders };
