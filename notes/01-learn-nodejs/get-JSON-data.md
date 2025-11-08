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

## Adding POST Request

Get data from frontend form and sent to the backend API

- Collect incoming data
- parse data to JS
- sanitize it: guard against malicious code
- get our existing data
- add the new data to the existing data without mutating it
- write the compelete data to the JSON file

`handlePost` function will use the following utility functions:

- `parseJSONBody()` - collect and parse the incoming JSON from the form
- `santizeData()`
- `addNewData()` - add the new data to the dataset, will also use `getData` to retrieve all the data on API to add new data to
- `sendResponse` - sends the response to the client

Get the body of the client request - client sends the request as chunks to the server so need to iterate over those chunks and add each to the body

- Node will just give access to the chunks of the stream from the request body when iterating over - ignoring the url, method, and other properties

```js
if (req.url === "/api" && req.method === "POST") {
  let body = ``;

  // how can we loop over req? and just iterate over the body?
  // if loop over req Node will just give access to chunks in the stream
  for await (const chunk of req) {
    body += chunk;
  }

  try {
    // parse data
    const emailObject = JSON.parse(body);

    res.setHeader("Content-Type", "application/JSON");
    res.statusCode = 200;

    // JS object coming in from front end needs to be converted to a string for backend
    res.end(JSON.stringify(emailObject));
  } catch (err) {
    console.log("Invalid JSON", err);
  }

  return;
}
```

1. Collect and parse the incoming JSON from the client (sent in chunks)

```js
export async function parseJSONData(req) {
  let body = "";

  for await (const chunk of req) {
    body += chunk;
  }

  // try to return parsed data
  try {
    const data = JSON.parse(body);
    return body;
  } catch (err) {
    throw new Error(`JSON data is invalid: ${err}`);
  }
}

// handle post request will then call parseJSON data

export async function handlePost(req, res) {
  try {
    const parsedData = await parseJSONData(req);
    await addNewData(parsedData);
  } catch (err) {
    console.log(err);
  }
}
```
