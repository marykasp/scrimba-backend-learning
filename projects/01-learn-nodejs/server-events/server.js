import http from "node:http";
import { handleFiles } from "./handleFiles";
import { getTemp } from "./getTemp";

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith("/temp/live")) {
    // return static files
    return await handleFiles(req, res, __dirname);
  } else if (req.url === "/temp/live") {
    // set up server side stream of data
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // send the temperature to client
    setInterval(() => {
      const temperature = getTemp();

      // res.end would finish the response
      res.write(
        `data: ${JSON.stringify({
          event: "temp-updated",
          temp: temperature,
        })}\n\n`,
      );
    }, 2000);
  }
});

server.listen(8000, () => console.log("listening 8000"));
