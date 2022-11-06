"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../controllers/auth-controller/auth");
const auth = express_1.default.Router();
auth.get("/login", auth_1.Login);
auth.post("/login", auth_1.Login);
auth.get("/register", auth_1.Register);
auth.post("/register", auth_1.Register);
auth.get("/*", (req, res, next) => {
    console.log("hello world");
    try {
        throw "error";
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
