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
      .json({ error: "Failed to fetch genres", details: err.message });
  }
}

export async function getProducts(req, res) {
  try {
    const db = await getDBConnection();

    let query = `SELECT * FROM products`;
    const products = await db.all(query);
    console.log(products);
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Failed to fetch products`, details: err.message });
  }
}
