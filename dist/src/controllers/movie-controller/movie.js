"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovies = void 0;
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("../../models/user/user"));
const users = require(path_1.default.resolve(process.cwd(), "database", "database.json"));
const getMovies = (req, res) => {
    try {
        let movies = [];
        users.map((data) => {
            if ((data === null || data === void 0 ? void 0 : data.Movies.length) > 0) {
                data.Movies.map((file) => {
                    movies.unshift(file);
                });
            }
        });
        // console.log(movies);
        res.status(200).json(movies);
    }
    catch (error) {
        console.log(error);
    }
};
exports.getMovies = getMovies;
const createMovie = (req, res) => {
    var _a;
    //post requuset
    //email, movieObjext
    const { email, Movie } = req.body;
    console.log(email, Movie);
    const userMovieToEdit = users === null || users === void 0 ? void 0 : users.filter((userData) => {
        return userData.email == email;
    });
    if (userMovieToEdit.length > 0) {
        console.log(true);
        (_a = userMovieToEdit[0]) === null || _a === void 0 ? void 0 : _a.Movies.unshift(Movie);
        let newDatabase = users.map((userDatas) => {
            if (userDatas.email == email) {
                return userMovieToEdit;
            }
            else {
                return userDatas;
            }
        });
        console.log(users);
        (0, user_1.default)(newDatabase[0]);
        return res.status(201).json(newDatabase[0]);
    }
    else {
        console.log("false");
        res.status(404).json({ code: 404, message: "no user found " });
    }
};
exports.createMovie = createMovie;
const updateMovie = (req, res) => {
    const { email, data } = req.body;
    console.log(req.params.id, email, data);
    const updateMovie = users.filter((file) => {
        return file.email === email;
    });
    console.log(updateMovie);
    // if (updateMovie.length > 0) {
    //   updateMovie[0]?.Movies.push(Movie);
    // }
    // let newMovie = users.map((userMovies: any) => {
    //   if (userMovies.id === id) {
    //     return updateMovie;
    //   } else {
    //     return userMovies;
    //   }
    // });
    // console.log(JSON.stringify(newMovie));
    // res.status(200).json({ message: "updated" });
};
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => {
    // const movieIndex = movies.find((val) => val.id === Number(req.params.id));
    // movies.slice(movieIndex, 1);
    // res.status(200).json({ message: "Deleted" });
};
exports.deleteMovie = deleteMovie;
