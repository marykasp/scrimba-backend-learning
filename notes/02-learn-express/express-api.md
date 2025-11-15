# Build an Express API

Project: Startup API, startups information is displayed in an object

- hit `/api` endpoint and retrieve all of the data
- request `/api/industry/ai` - use path params to find startups based on industry or location
- request using query params `/api?has_mvc=true&is_seeking_funding=true`

What will be learning:

- creating a server using Express.js
- sending status codes
- setting headers
- handling requests/responses
- filtering data
- extracting path/query params

## Setting Up Server

`package.json` file is the blueprint of the project

- contains metadata (name, version, author, description)
- simplifies collaboration
  - manages dependencies
  - defines start script

`npm init` - initializes the package json file to start a project

`npm install express` - install package and any necessary dependencies

```jsx
import express from "express";

const PORT = 8000;

// instance of express object
const app = express();

app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
```

## Request/Response Cycle

Client makes http request to server, server sends back http response

- request - method, request path (url), data (query string/path params)
- response - (handles request) filtering data, throw an error, generate a response, passed over http back to the client
  - Resource (JSON)
  - Content-Type - `application/json`
  - Status code
  - status message
- front end code will process the response object to display the data

### Sending a Response

`/` - root of the domain

Retrieve/send `JSON` data - cannot send raw JSON data. Can only send JSON strings

- normally need to use `JSON.stringify(data)`

```js
app.get(`/`, (req, res) => {
  // json method converts the raw JSON to a string (http- servers must return text based due to compliance reasons)
  res.json(data);
});
```
