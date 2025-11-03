### Build a REST API

Create wild horizons - displays a name and location of a fun place to visit

<aside>
<img src="/icons/exclamation-mark-double_gray.svg" alt="/icons/exclamation-mark-double_gray.svg" width="40px" />

Wild horizons - a dataset of the planet’s most interesting places

</aside>

```tsx
/api
/api/country/india
/api?country # open to more specific queries
```

## Curriculum overview:

1. HTTP module
   - [x] creating a server
   - [x] sending status codes (200, 400, etc)
   - [x] setting headers
   - [x] handling requests/responses
   - [x] filtering data - by path params or query params that retrieve from url and urlObj search params
   - [x] extracting query params

`package.json`

- contains metadata
- simplifies collaboration
  - define scripts
  - manages dependencies

`npm init` - initialize, launches a utility that build package.json file

- `npm start` - stars the node server and runs the starting point file `server.js`
- in package.json set `"type": "module"` in order to allow for importing files

```jsx
import https from "node:http";
```

### HTTP module

allows data to be transferred over HTTP protocol (hyper text transfer protocol)

- handle requests from clients
- create servers
- provide responses to those requests

```jsx
// port to listen to
const port = 8000;

// create server
const server = http.createServer((req, res) => {
  // res object exposes methods for us to use
  res.end("hello from the server!", "utf8", () => console.log("response end")); // sends data over http and ends the response
});

server.listen(PORT, () => console.log(`server running on port: ${PORT}`));
```

`res.write` - writes data to be written in the response

```jsx
res.write("this is some data \n"); // still need to include res.end to end the response
```

## Request/Response Cycle

Client makes an `http` request to the server. Request is comprised of:

- Method: GET, POST, PUT, DELETE `req.method`
- Request path `req.url`
- headers
- data: query string/path params

Server then handles the request and sends back a response:

- filtering data
- throw an error if there is a mistake in the request
- generates a response - response passed over `http` back to the client

Response contains:

- resource - data(JSON)
- content-type (application/json)
- status code
- status message

`JSON` - most data sent back from servers is in this format, but `http` requires text based

`JSON.stringify()` - converts JSON to strings, sent from server to client

### Modularize code

```javascript
export const function sendJSONResponse = (res, status, data) => {
	res.setHeader('Content-Type', 'application/json')
	res.statusCode = status
	res.end(JSON.stringify(data))
}

export const function getDataByPathParams(data, locationType, locationName) {
	return data.filter(destination => destination[locationType].toLowerCase() === locationName.toLowerCase()
}

export const function getDataByQueryParams(data, queryObj) {
	const {continent, country, is_open_to_public}} = queryObj
	// filter the data if there are params IF NOT just return the data
	// filter returns a new array so need to set the old data to the new array of objects fitlered
	if(continent) {
    data = data.filter(destination => destination.continent.toLowerCase() === continent.toLowerCase())
  }

  if(country) {
    data = data.filter(destination => destination.country.toLowerCase() === country.toLowerCase())
  }

  if(is_open_to_public) {
    data = data.filter(destination => destination.is_open_to_public === JSON.parse(is_open_to_public))
  }
}


```
