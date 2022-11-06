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
exports.validatePassword = exports.genPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
function genPassword(input) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(input);
        let hash512 = crypto_1.default.createHash("sha512");
        let hashData = hash512.update(JSON.stringify(input), "utf-8");
        let hashPassword = hashData.digest("hex");
        return hashPassword;
    });
}
exports.genPassword = genPassword;
function validatePassword(email, password) { }
exports.validatePassword = validatePassword;
