"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user = express_1.default.Router();
user.get("/");
user.post("/");
user.put("/");
user.delete("/");
exports.default = user;
