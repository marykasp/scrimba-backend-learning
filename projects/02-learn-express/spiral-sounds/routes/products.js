import express from "express";
import { getProducts } from "../controllers/productsControlllers";
import { getGenres } from "../controllers/productsControlllers";

export const productsRouter = express.Router();

productsRouter.get("/", getProducts);

productsRouter.get("/genres", getGenres);
