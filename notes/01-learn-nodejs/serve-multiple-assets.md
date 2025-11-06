# Serve Multiple Frontend Assets

Read file paths to different front end endpoints - to server `index.html`, `about.html` etc.

```javascript
import path from "node:path";
import fs from "node:fs/promises";
import { sendResponse } from "./sendResponse.js";
import { getContentType } from "./getContentType.js";

export async function serveStatic(req, res, baseDir) {
  /*
Challenge: 
  1. Write code below to serve files from our public directory.
     
     Don’t worry about handling errors for now.
     hint.md for help!
*/

  const filePath = path.join(baseDir, "public");
  const pathToResource = path.join(
    filePath,
    req.url === "/" ? "index.html" : req.url,
  );
  const ext = path.extname(pathToResource);
  console.log(ext);

  const contentType = getContentType(ext);

  try {
    const content = await fs.readFile(pathToResource);
    sendResponse(res, 200, contentType, content);
  } catch (err) {
    console.log(err);
  }
}
```

Utility function to get the content type from the file path .extension

```javascript
export function getContentType(ext) {
  const types = {
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };

  return types[ext.toLowerCase()] || "text/html";
}
```
