import express from "express";
import { Login, Register } from "../../controllers/auth-controller/auth";

const auth = express.Router();


auth.get("/login",Login);
auth.post("/login",Login);

auth.get("/register", Register);
auth.post("/register", Register);

auth.get("/*", (req, res, next) => {
  console.log("hello world");
  try {
    throw "error";
  } catch (error) {
    next(error);
  }
});

export default auth;
