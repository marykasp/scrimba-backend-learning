## Paths & Paths Module

**Current working directory** - folder in when running `node server.js`

```jsx
const __dirname = import.meta.dirname; // absolute path
console.log("CWD", process.cwd()); // returns which folder from which application was launched
```

**Absolute path** - show the full location of a file or folder on the system

- always the same, no matter where you run main script from
- independent of the current working directory

**Relative path** - relative to the file it appears in

- often include current folder (.) or up one folder (..)

`Path module` - join path elements to create one path which will work on any OS

- extract file names and extensions

```javascript
// PATH MODULE
import path from "node:path";

// absolute path to folder to server.js, then make up rest of file path
const absolutePathToResource = path.join(__dirname, "public", "index.html");
// /home/projects/projectName/public/index.html

const relativePathToResource = path.join("public", "index.html");
// public/index.html (relative path)
// relative to the current working directory don't care where code is being executed
// able to import path.join from any file and will still have same result
```
