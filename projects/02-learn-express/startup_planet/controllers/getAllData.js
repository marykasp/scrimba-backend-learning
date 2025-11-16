import { startups } from "../data/data.js";

export const getAllData = (req, res) => {
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
};
