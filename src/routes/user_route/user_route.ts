import express from "express";
import {
  createMovie,
  deleteMovie,
  updateMovie,
} from "../../controllers/movie-controller/movie";
import { dashboard } from "../../controllers/user-controller/user";
import { isAuthenticated } from "../../middleware/isAuthenticated";

const user = express.Router();
user.get("/dashboard", isAuthenticated, dashboard);
user.post("/movie/create", isAuthenticated, createMovie);
user.delete("/movie/delete/:id", isAuthenticated, deleteMovie);
user.put("/movie/update/:id", isAuthenticated, updateMovie);

export default user;
