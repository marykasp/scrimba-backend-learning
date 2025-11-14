import http from "node:http";
import { handleFiles } from "./handleFiles";
import { getTemp } from "./getTemp";

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith("/temp/live")) {
    return await handleFiles(req, res, __dirname);
  }
});

server.listen(8000, () => console.log("listening 8000"));
