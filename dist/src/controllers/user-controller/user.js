"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("../../models/user/user"));
const users = require(path_1.default.resolve(process.cwd(), "database", "database.json"));
// console.log(users);
const getUsers = (req, res) => {
    res.status(200).json(users);
};
exports.getUsers = getUsers;
const createUser = (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(200).json({ message: "user created" });
    (0, user_1.default)(users);
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    const userUpdated = users.filter((file) => file.email === req.params.email);
    console.log(userUpdated);
    users.name.push(req.body.name);
    res.status(200).json({ message: "updated" });
    (0, user_1.default)(users);
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    try {
        const deleteUser = users.filter((user) => user.email != req.body.emails);
        res.status(200).json({ message: "user deleted" });
        (0, user_1.default)(deleteUser);
    }
    catch (error) {
        res.status(400).json({ message: "user nor deleted" });
    }
};
exports.deleteUser = deleteUser;
