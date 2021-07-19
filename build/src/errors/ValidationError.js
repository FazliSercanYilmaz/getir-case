"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const CustomError_1 = require("./CustomError");
const ErrorConfig_1 = __importDefault(require("../ErrorConfig"));
class ValidationError extends CustomError_1.CustomError {
    constructor(message) {
        super(message, ErrorConfig_1.default.validationError.code, ErrorConfig_1.default.validationError.name);
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
    static getDefaultError() {
        return new ValidationError(ErrorConfig_1.default.validationError.messages.default);
    }
}
exports.ValidationError = ValidationError;
