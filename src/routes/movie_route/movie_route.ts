import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovies,
  updateMovie,
  getMovie,
} from "../../controllers/movie-controller/movie";

const movie = express.Router();

movie.get("/", getMovies);

movie.get("/:id", getMovie);

movie.post("/create", createMovie);

movie.put("/update/:id", updateMovie);

movie.delete("/delete/:id", deleteMovie);

export default movie;
