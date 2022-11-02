import express from "express";
import {
  add_movie,
  delete_movie,
  update_movie,
} from "../../controllers/movie-controller/movie";
const movie = express.Router();



movie.post("/", add_movie);

movie.put("/", update_movie);

movie.delete("/", delete_movie);

export default movie;
