import { HttpError } from "http-errors";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import logger from "morgan";
dotenv.config();
const app = express();

//::::::::::::routes:::::::::::::::::::
import movie from "./routes/movie_route/movie_route";
import user from "./routes/user_route/user_route";
import auth from "./routes/auth_route/auth_route";

// :::::::::::::End of Route::::::::::::

// view engine setup
app.set("views", path.join(process.cwd(), "./src/views"));
app.set("view engine", "ejs");

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "./public")));

app.use("/auth", auth);
app.use("/movie", movie);
app.use("/user", user);

app.get("/", (req, res) => {
  console.log(req.headers);
  res.render("home");
});

app.listen(process.env.PORT, () => {
  console.log(` server running on ${process.env.PORT}`);
});
