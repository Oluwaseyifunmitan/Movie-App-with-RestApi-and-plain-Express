"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_movie = exports.add_movie = exports.delete_movie = exports.saveFile = void 0;
const fs_1 = __importDefault(require("fs"));
function saveFile(saved) {
    let myd = JSON.stringify(saved);
    fs_1.default.writeFile("./database.json", myd, "utf8", (err) => {
        if (err)
            throw err;
        console.log("file has been written");
    });
}
exports.saveFile = saveFile;
function delete_movie(incomingId) {
    //const { id } = JSON.parse(incomingId.toString());
    // saveFile('1')
}
exports.delete_movie = delete_movie;
function add_movie(chunk) {
    //saveFile('data');
}
exports.add_movie = add_movie;
function update_movie() { }
exports.update_movie = update_movie;
