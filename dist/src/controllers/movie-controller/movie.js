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
// export const updateMovie = (req: Request, res: Response) => {
//   const { email, data, id } = req.body;
//   console.log(req.params.id, email, data);
//   let movies = req.body;
//   const updateMovie = users.filter((file: any) => {
//     return file.email === email;
//   });
//   console.log(updateMovie);
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, title, description, image, price } = yield req.body;
        const id = req.params.id;
        const userMovieToEdit = users === null || users === void 0 ? void 0 : users.filter((userData) => {
            return userData.email === email;
        });
        const findMovieById = userMovieToEdit.Movies.find((movie) => movie.id === id);
        if (!findMovieById) {
            res.status(400).json({ message: "Movie not found" });
        }
        const bodyData = {
            title: title | findMovieById.title,
            description: description | findMovieById.description,
            image: image | findMovieById.image,
            price: price | findMovieById.price,
        };
        const index = userMovieToEdit.Movies.findIndex((eachmovie) => eachmovie.id === id);
        userMovieToEdit.Movies[index] = Object.assign({ findMovieById }, bodyData);
        (0, user_1.default)(userMovieToEdit.Movies[index]);
        return res.status(200).json(userMovieToEdit.Movies[index]);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => {
    // const movieIndex = movies.find((val) => val.id === Number(req.params.id));
    // movies.slice(movieIndex, 1);
    // res.status(200).json({ message: "Deleted" });
};
exports.deleteMovie = deleteMovie;
