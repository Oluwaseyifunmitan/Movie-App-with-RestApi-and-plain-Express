import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovies,
  updateMovie,
  getMovie,
} from "../../controllers/movie-controller/movie";
import { isAuthenticated } from "../../middleware/isAuthenticated";

const movie = express.Router();

movie.get("/", getMovies);

movie.get("/:id", getMovie);

movie.post("/create", isAuthenticated, createMovie);

movie.put("/update/:id", updateMovie);

movie.delete("/delete/:id", deleteMovie);

export default movie;
