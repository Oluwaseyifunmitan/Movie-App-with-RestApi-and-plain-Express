"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movie_1 = require("../../controllers/movie-controller/movie");
const isAuthenticated_1 = require("../../middleware/isAuthenticated");
const movie = express_1.default.Router();
movie.get("/", movie_1.getMovies);
movie.get("/:id", movie_1.getMovie);
movie.post("/create", isAuthenticated_1.isAuthenticated, movie_1.createMovie);
movie.put("/update/:id", movie_1.updateMovie);
movie.delete("/delete/:id", movie_1.deleteMovie);
exports.default = movie;
