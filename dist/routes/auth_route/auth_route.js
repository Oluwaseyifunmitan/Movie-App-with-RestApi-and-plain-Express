"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth = express_1.default.Router();
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
    try {
        throw "error";
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
