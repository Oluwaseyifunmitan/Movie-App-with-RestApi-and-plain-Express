import express from "express";
import {
  add_movie,
  delete_movie,
  update_movie,
} from "../../controllers/movie-controller/movie";
const auth = express.Router();

auth.get("/login", (req, res, next) => {
  res.render("Login");
});

auth.post("/login", (req, res, next) => {
  res.render("Login");
});

auth.get("/register", (req, res, next) => {
  res.render("Register");
});

auth.post("/register", (req, res, next) => {
  res.render("Register");
});

auth.get("/*", (req, res, next) => {
  console.log("hello world");
  try {
    throw "error";
  } catch (error) {
    next(error);
  }
});

export default auth;
