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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const tokenUtils_1 = require("../../Utils/tokenUtils");
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.headers);
    let cookie = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("=")[1];
    let user = yield (0, tokenUtils_1.extractUser)(cookie);
    if (user) {
        req.user = user;
        next();
    }
    else {
        req.user = null;
        res.redirect("/auth/login");
    }
    //console.log(user);
    //   let user = next();
});
exports.isAuthenticated = isAuthenticated;
