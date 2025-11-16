import express from "express";

const app = express();
const PORT = 8000;

app.use(express.static("public"));

app
  .listen(8000, () => console.log(`Server running on port: ${PORT}`))
  .on("error", (err) => {
    console.error("Failed to start server:", err);
  });
