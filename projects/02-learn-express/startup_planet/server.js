import express from "express";
import { apiRouter } from "./routes/apiRoutes.js";

const app = express();

const PORT = 8000;

app.use(`/api`, apiRouter);

// handle bad path request
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
