"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function saveFile(saved) {
    let myd = JSON.stringify(saved);
    fs_1.default.writeFile("./database/database.json", myd, "utf8", (err) => {
        if (err)
            throw err;
        console.log("file has been written");
    });
}
exports.default = saveFile;
