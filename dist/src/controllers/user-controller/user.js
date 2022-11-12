"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = void 0;
const path_1 = __importDefault(require("path"));
const users = require(path_1.default.resolve(process.cwd(), "database", "database.json"));
// console.log(users);
// export const getUsers = (req: Request, res: Response) => {
//   res.status(200).json(users);
// };
// export const createUser = (req: Request, res: Response) => {
//   const user = req.body;
//   users.push(user);
//   res.status(200).json({ message: "user created" });
//   saveFile(users);
// };
const dashboard = (req, res) => {
    try {
        const { email, _id } = req.user;
        if (_id && email) {
            let data = users.find((user) => user.email == email);
            res.status(200).render("dashboard", { data });
        }
        else {
            res.status(400).json({ message: "no access" });
        }
    }
    catch (error) {
        res.status(400).json({ message: "no access" });
    }
};
exports.dashboard = dashboard;
