import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovies,
  updateMovie,
} from "../../controllers/movie-controller/movie";

const movie = express.Router();

movie.get("/", getMovies);

movie.post("/create", createMovie);

movie.put("/update/:id", updateMovie);

movie.delete("/movies/:id", deleteMovie);

export default movie;
