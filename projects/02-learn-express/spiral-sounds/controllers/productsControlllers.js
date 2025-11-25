import { getDBConnection } from "../db/db.js";

export async function getGenres(req, res) {
  try {
    // set up connect with db
    const db = await getDBConnection();

    //SQL query the genres
    const query = `SELECT DISTINCT genre from products`;
    const genres = await db.all(query);

    // convert the object of genres into a string of genres
    const genreStrings = genres.map((genre) => genre.genre);
    res.json(genreStrings);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch genress", details: err.message });
  }
  console.log("genres");
}

export async function getProducts() {
  console.log("products");
}
