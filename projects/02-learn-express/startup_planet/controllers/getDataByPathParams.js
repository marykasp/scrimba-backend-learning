import { startups } from "../data/data.js";

export const getDataByPathParams = (req, res) => {
  const { field, term } = req.params;
  console.log(req.params);

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
};
