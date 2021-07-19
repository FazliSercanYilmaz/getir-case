"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordError = void 0;
const CustomError_1 = require("./CustomError");
const ErrorConfig_1 = __importDefault(require("../ErrorConfig"));
class RecordError extends CustomError_1.CustomError {
    constructor(message) {
        super(message, ErrorConfig_1.default.recordError.code, ErrorConfig_1.default.recordError.name);
        Object.setPrototypeOf(this, RecordError.prototype);
    }
    static getDefaultError() {
        return new RecordError(ErrorConfig_1.default.recordError.messages.default);
    }
    static getRecordNotFoundError() {
        return new RecordError(ErrorConfig_1.default.recordError.messages.recordNotFound);
    }
}
exports.RecordError = RecordError;
