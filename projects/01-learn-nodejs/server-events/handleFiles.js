import fs from "node:fs/promises";
import path from "node:path";

export async function handleFiles(req, res, dir) {
  try {
    const fileName = req.url === "/" ? "index.html" : "index.js";
    const filePath = path.join(dir, "public", fileName);

    const content = await fs.readFile(filePath, "utf8");
    const contentType = req.url === "/" ? "text/html" : "text/javascript";

    res.setHeader("Content-Type", contentType);
    res.end(content);
  } catch (err) {
    res.statusCode = 500;
    res.end("Error loading the file");
    console.log(err);
  }
}
