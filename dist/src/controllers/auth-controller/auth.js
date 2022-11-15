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
exports.Logout = exports.Register = exports.Login = void 0;
//authenticate the user using
// email password
const path_1 = __importDefault(require("path"));
const passwordUtils_1 = require("../../../Utils/passwordUtils");
const user_1 = __importDefault(require("../../models/user/user"));
const tokenUtils_1 = require("../../../Utils/tokenUtils");
const genId_1 = __importDefault(require("../../../Utils/genId"));
const users = require(path_1.default.resolve(process.cwd(), "database", "database.json"));
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === "GET") {
        return res.render("Login");
    }
    else {
        const { email, password } = req.body;
        const loggedIn = users.filter((user) => user.email == email);
        if (loggedIn.length > 0) {
            let hash = yield (0, passwordUtils_1.genPassword)(password);
            let _id = loggedIn[0]._id;
            if (hash == loggedIn[0].password) {
                let token = yield (0, tokenUtils_1.genToken)({ email: email, _id: _id });
                res.cookie("token", token); // set a cookie during login
                return res
                    .status(200)
                    .json({ code: 200, message: "you have successfully logged in" });
            }
            else {
                return res.status(400).json({ code: 400, message: "not logged in" });
            }
        }
        else {
            return res.send("no user with this account");
        }
    }
});
exports.Login = Login;
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === "GET") {
        return res.render("Register");
    }
    else {
        //validate input with joi
        try {
            const { password, email } = req.body;
            let hash = yield (0, passwordUtils_1.genPassword)(password);
            req.body.password = hash;
            const registeredUser = users.filter((user) => user.email == email);
            if (registeredUser.length > 0) {
                res.status(400).json({ code: 400, message: "user exists" });
            }
            else {
                let user = req.body;
                let _id = new genId_1.default().gen();
                user._id = _id;
                user.Movies = [];
                users.push(user);
                (0, user_1.default)(users);
                // genearate Id for users
                let token = yield (0, tokenUtils_1.genToken)({ email: email, _id: _id });
                res.cookie("token", token);
                return res.status(201).json({ code: 201, message: "please login" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
});
exports.Register = Register;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.headers.cookie = "";
    res.clearCookie("token");
    res.setHeader("authorization", [""]);
    req.headers.authorization = "";
    res.redirect("/");
});
exports.Logout = Logout;
