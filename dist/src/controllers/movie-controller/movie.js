"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovie = exports.getMovies = void 0;
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("../../models/user/user"));
const genId_1 = __importDefault(require("../../../Utils/genId"));
const users = require(path_1.default.resolve(process.cwd(), "database", "database.json"));
const getMovies = (req, res) => {
    try {
        const movies = [];
        users.forEach((user) => {
            user.Movies.forEach((mov) => {
                movies.push(mov);
            });
        });
        console.log(movies);
        res.render("movies", { data: movies });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getMovies = getMovies;
const getMovie = (req, res) => {
    try {
        let movie;
        const id = req.params.id;
        users.forEach((user) => {
            let gotThis = user.Movies.find((data) => data.id == id);
            if (gotThis) {
                movie = gotThis;
            }
        });
        res.json({ code: 200, movie });
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.getMovie = getMovie;
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = req.body;
    const { email } = req.user;
    let genId = new genId_1.default();
    movie.id = genId.gen();
    let personToaddMovie = users.find((user) => user.email == email);
    if (personToaddMovie) {
        personToaddMovie.Movies.unshift(movie);
        let newDatabase = users.map((user) => {
            if (user.email == email) {
                return personToaddMovie;
            }
            else {
                return user;
            }
        });
        res
            .status(201)
            .json({ code: 201, message: "movie created successfuly", movie });
        (0, user_1.default)(newDatabase);
    }
    else {
        res.status(400).json({ code: 400, message: "could not create movie" });
    }
});
exports.createMovie = createMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body);
        const { email } = req.user;
        const Movie = req.body;
        let movieId = req.params.id;
        // console.log(req.params.id, email, data);
        let user = users.filter((file) => {
            return file.email === email;
        });
        if (user.length > 0) {
            user[0].Movies.forEach((mov) => {
                if (mov.id === movieId) {
                    Movie.title ? (mov.title = Movie === null || Movie === void 0 ? void 0 : Movie.title) : null;
                    Movie.price ? (mov.price = Movie === null || Movie === void 0 ? void 0 : Movie.price) : null;
                    Movie.image ? (mov.image = Movie === null || Movie === void 0 ? void 0 : Movie.image) : null;
                    Movie.description ? (mov.description = Movie === null || Movie === void 0 ? void 0 : Movie.description) : null;
                    console.log(mov);
                }
            });
            let newDatabase = users.map((person) => {
                if (person.email == email) {
                    return user[0];
                }
                else {
                    return person;
                }
            });
            (0, user_1.default)(newDatabase);
            res.json(newDatabase);
        }
        else {
            res.json({ code: 400, message: "no such users" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        let newDatabase = users.map((user) => {
            var _a;
            const newMovies = (_a = user === null || user === void 0 ? void 0 : user.Movies) === null || _a === void 0 ? void 0 : _a.filter((file) => file.id != id);
            user.Movies = newMovies;
            return user;
        });
        (0, user_1.default)(newDatabase);
        res.status(200).json({ code: 200, message: "movie deleted" });
    }
    catch (error) {
        res.status(400).json({ code: 400, message: "not deleted" });
    }
};
exports.deleteMovie = deleteMovie;
