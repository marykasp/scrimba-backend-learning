# Getting JSON Data

Retrieve JSON data from `data` directory to serve up on the frontend in the `sightings.html`

Create a `getData` function that reads the content in the `data.json` file, parses it to JS, and returns the parsed data

```javascript
import path from "node:path";
import fs from "node:fs/promises";

export async function getData() {
  // read the json file as a string: designed to be used in every part of app
  // use a relative file path
  try {
    const filePath = path.join("data", "data.json");
    const data = await fs.readFile(filePath, "utf8");
    // parse into JS
    const parsedData = JSON.parse(data);

    return parsedData;
  } catch (error) {
    console.log(error);
    return [];
  }
}
```

## Wire up the API

Create a `handlers` directory and a file called `routeHandles.js`

- create two functions - to handle both `get` and `post` requests
- use the `getData` function to retrieve the parse JSON data and then pass it to the `sendResponse` function that handles how the data is served to the client

```javascript
// server.js
const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  if (req.url === "api") {
    if (req.method === "GET") {
      // handleGet returns a promise since awaits data from getData function
      return await handleGet(res);
    }
  } else if (!req.url.startsWith("/api")) {
    // if not api end point then serve the static files
    return await serveStatic(req, res, __dirname);
  }
});

// routeHandlers
export async function handleGet(res) {
  const data = await getData();
  const content = JSON.stringify(data);
  sendResponse(res, 200, "application/JSON", payload);
}
```
