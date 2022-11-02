"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movie_1 = require("../../controllers/movie-controller/movie");
const movie = express_1.default.Router();
movie.post("/", movie_1.add_movie);
movie.put("/", movie_1.update_movie);
movie.delete("/", movie_1.delete_movie);
exports.default = movie;
