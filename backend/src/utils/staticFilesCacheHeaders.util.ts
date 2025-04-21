import path from "node:path";
import { Response } from "express";

function setStaticFilesCacheHeaders(res: Response, file: string) {
    if (path.extname(file) !== ".html") {
        res.setHeader("Cache-Control", "public, max-age=31557600");
    }
}

export { setStaticFilesCacheHeaders };
