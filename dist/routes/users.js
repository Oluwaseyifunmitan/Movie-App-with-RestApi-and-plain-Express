"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users = [
    {
        fullname: "John doe",
        username: "Jhonny101",
        email: "john@example.com",
        password: "johntheGOAT!"
    },
];
/* GET users listing. */
router.get("/", (req, res, next) => {
    console.log(users);
    res.send("respond with a resource");
});
router.post('/', (req, res, next) => {
    res.send("post route reached");
});
module.exports = router;
