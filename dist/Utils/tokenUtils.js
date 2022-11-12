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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUser = exports.validateToken = exports.genToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function genToken(input) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = jsonwebtoken_1.default.sign(input, (_a = process.env.SECRETKEY_TOKEN_KEY) !== null && _a !== void 0 ? _a : "secret");
        return accessToken;
    });
}
exports.genToken = genToken;
function validateToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userToken = jsonwebtoken_1.default.decode(token);
            console.log(userToken);
            return userToken;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.validateToken = validateToken;
const extractUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return jsonwebtoken_1.default.decode(token);
    }
    catch (error) {
        return null;
    }
});
exports.extractUser = extractUser;
