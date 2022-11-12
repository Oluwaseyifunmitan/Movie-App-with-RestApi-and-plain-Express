"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movie_1 = require("../../controllers/movie-controller/movie");
const user_1 = require("../../controllers/user-controller/user");
const isAuthenticated_1 = require("../../middleware/isAuthenticated");
const user = express_1.default.Router();
user.get("/dashboard", isAuthenticated_1.isAuthenticated, user_1.dashboard);
user.post("/movie/create", isAuthenticated_1.isAuthenticated, movie_1.createMovie);
user.delete("/movie/delete/:id", isAuthenticated_1.isAuthenticated, movie_1.deleteMovie);
user.put("/movie/update/:id", isAuthenticated_1.isAuthenticated, movie_1.updateMovie);
exports.default = user;
