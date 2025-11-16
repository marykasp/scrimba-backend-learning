import express from "express";
import { startups } from "./data/data.js";

const app = express();

const PORT = 8000;

// get ALL data or only those based on query params
app.get(`/api`, (req, res) => {
  // filter based on query params
  let filteredData = startups;

  console.log(req.query);

  // deconstructure query params
  const { country, industry, continent, is_seeking_funding, has_mvp } =
    req.query;

  if (country) {
    filteredData = filteredData.filter(
      (startup) => startup.country.toLowerCase() === country.toLowerCase(),
    );
  }

  if (industry) {
    filteredData = filteredData.filter(
      (startup) => startup.industry.toLowerCase() === industry.toLowerCase(),
    );
  }

  if (continent) {
    filteredData = filteredData.filter(
      (startup) => startup.continent.toLowerCase() === continent.toLowerCase(),
    );
  }

  // filter based on boolean values - these are boolean values on req.query object
  if (has_mvp) {
    filteredData = filteredData.filter(
      (startup) => startup.has_mvp === JSON.parse(has_mvp.toLowerCase()),
    );
  }

  res.json(filteredData);
});

// get data from url params
app.get(`/api/:field/:term`, (req, res) => {
  const { field, term } = req.params;
  console.log(field);

  // allow only these fields
  const allowedFields = ["country", "continent", "industry"];

  // share a message if field is not in the allowedFields
  if (!allowedFields.includes(field)) {
    return res.status(400).json({ message: "Search field not allowed." });
  }

  const filteredData = startups.filter(
    (startup) => startup[field].toLowerCase() === term.toLowerCase(),
  );

  res.json(filteredData);
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
