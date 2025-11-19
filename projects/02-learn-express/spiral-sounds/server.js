import express from "express";
import { productsRouter } from "./routes/products.js";

const app = express();
const PORT = 8000;

app.use(express.static("public"));

app.use("/api/products", productsRouter);

app
  .listen(8000, () => console.log(`Server running on port: ${PORT}`))
  .on("error", (err) => {
    console.error("Failed to start server:", err);
  });
