import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";
import { vinyl } from "./data.js";

// Take data vinyl and add to the database

async function seedTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database,
  });

  try {
    await db.exec("BEGIN TRANSACTION");
    // iterate over array of vinyl data and insert into db
    for (const { title, artist, price, image, year, genre, stock } of vinyl) {
      await db.run(
        `
        INSERT INTO products (title, artist, price, image, year, genre, stock)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [title, artist, price, image, year, genre, stock],
      );
    }

    await db.exec("COMMIT");
    console.log("All records inserted successfully.");
  } catch (err) {
    console.error("Error inserting data:", err.message);
  } finally {
    await db.close();
    console.log("Database connection closed.");
  }
}

seedTable();
