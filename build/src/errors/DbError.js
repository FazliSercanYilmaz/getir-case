"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbError = void 0;
const ErrorConfig_1 = __importDefault(require("../ErrorConfig"));
class DbError extends Error {
    constructor(message) {
        super(message);
        this.name = ErrorConfig_1.default.dbError.name;
        this.code = ErrorConfig_1.default.dbError.code;
        Object.setPrototypeOf(this, DbError.prototype);
    }
    static getDefaultError() {
        return new DbError(ErrorConfig_1.default.dbError.messages.default);
    }
}
exports.DbError = DbError;
