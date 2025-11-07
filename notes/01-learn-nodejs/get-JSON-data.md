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
