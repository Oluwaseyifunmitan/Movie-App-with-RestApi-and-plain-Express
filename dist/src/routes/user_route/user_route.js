"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../../controllers/user-controller/user");
const user = express_1.default.Router();
user.get("/", user_1.getUsers);
user.post("/", user_1.createUser);
user.put("/:email", user_1.updateUser);
user.delete("/:email", user_1.deleteUser);
exports.default = user;
