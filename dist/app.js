"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//::::::::::::routes:::::::::::::::::::
const movie_route_1 = __importDefault(require("./routes/movie_route/movie_route"));
const user_route_1 = __importDefault(require("./routes/user_route/user_route"));
const auth_route_1 = __importDefault(require("./routes/auth_route/auth_route"));
// :::::::::::::End of Route::::::::::::
// view engine setup
app.set("views", path_1.default.join(process.cwd(), "./src/views"));
app.set("view engine", "ejs");
//middlewares
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(process.cwd(), "./public")));
app.use("/movie", movie_route_1.default);
app.use("/user", user_route_1.default);
app.use("/auth", auth_route_1.default);
app.get("/", (req, res) => {
    res.render("home");
});
// app.get("/",())
// app.get("/", (req, res, next) => {
//   res.status(200).json({ code: 200, message: "entry" });
// });
app.listen(process.env.PORT, () => {
    console.log(` server running on ${process.env.PORT}`);
});
