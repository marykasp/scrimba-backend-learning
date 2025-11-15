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

### Query Parameters

`request object` -

- `req.body` - data from the request body
- `req.params`
- `req.method` - http method
- `req.ip` - client’s IP address
- `req.query` - query params `/api/?boolean=true&location=newyork`
  - returns an object with key/value pairs of the queries

```jsx
app.get(`/api/`, (req, res) => {
  req.query; // {job: 'movie-star', isRich: `true`}
  // use the object to filter the JSON data and then serve to the client
});
```

### Filtering by Query Params

Extract the query params and use that object in order to filter the data

```jsx
app.get(`/api`, (req, res) => {
  const filteredData = startups;
  const { industry, country, continent, is_mvp } = req.query;

  // filter based on params - check if params exists before filtering
  if (industry) {
    filteredData = filteredData.filter(
      (startup) => startup.industry.toLowerCase() === industry.toLowerCase(),
    );
  }

  if (is_mvp) {
    filteredData = filteredData.filter(
      (startup) => startup.is_mvp === JSON.parse(is_mvp.toLowerCase()),
    );
  }
});
```

### Path params

Retrieve the path params from the `req.params`

- `/api/crypto-name/:currency` - extracts the value about the `:` and puts it in an object
- `{currency: 'eth'}`

```jsx
// add a new GET route for requests with path params
// /api/<field>/<term>

app.get(`/api/:field/:term`, (req, res) => {
  // store filtered data
  let filteredData = startups;

  // get path params
  const { field, term } = req.params;

  if (field) {
    filteredData = filteredData.filter(
      (startup) => startup[field].toLowerCase() === term.toLowerCase(),
    );
  }
});
```

Want only the endpoints of `country, continent, and industry` if user tries a different field serve a message object, change status code

```jsx
app.get(`/api/:field/:term`, (req, res) => {
  // store filtered data
  let filteredData = startups;

  // get path params
  const { field, term } = req.params;
  const allowedFields = ["country", "continent", "industry"];

  // if field is not in the specified fields above send a response message
  // send a 400 bad request status code in response object
  if (!allowedFields.includes(field)) {
    return res.status(400).json({ message: "Not allowed to use this field" });
  }

  if (field) {
    filteredData = filteredData.filter(
      (startup) => startup[field].toLowerCase() === term.toLowerCase(),
    );
  }
});
```

## `express.Router()`

- set up an express router for specific paths like `/api`
- set up a controller - functional logic to run when request data from that path

```jsx
const apiRouter = express.Router()

const productsController = (req, res) => {
	res.json({data: 'products'})
}

const servicesController = (req, res) => {
	res.json({data: 'services'})
}

// just like app.get, this router needs the path and the controller function
apiRouter.get(`/products`, productsController)

apiRouter.get(`/services`), servicesController)

// use method - any request starting with that path then use that router
app.use(`/api`, apiRouter)
```

- save controllers in separate controller files
- save apiRoutes in routes folder
- need to export controllers from their files to import into the routes folder

```jsx
//Controllers folder

// productsController.js
export const productsController = (req, res) => {
  res.json({ data: "products" });
};

// servicesController.js
export const servicesController = (req, res) => {
  res.json({ data: "services" });
};
```

```jsx
import express from 'express'
import {productsController} from "'../controller/productsController.js"

// need to this apiRouter instance in the server.js file to pass to the app.use() method
export const apiRouter = express.Router()

apiRouter.get('/products', productsController}
```

Serve a 404 if no route

```js
app.use((req, res) => {
  res.status(404).json({ message: "endpoint is not found" });
});
```

## CORS

By default browsers enforce a `same-origin policy`. This means requests can only be made to the same **protocol**, **domain** and **port** as the one serving the web page.

`CORS` - cross origin resource sharing - want endpoints to be open to everyone with different domain or port from frontend. Allow all access to anyone frontend code

- send special CORS headers

```jsx
// install cors
import cors from "cors";
// at top of file - open CORS policy that allows all access applies to all routes below this
app.use(cors());
```
