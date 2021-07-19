"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
class ErrorResponse {
    constructor(error) {
        this.code = error.code;
        this.msg = error.message;
    }
}
exports.ErrorResponse = ErrorResponse;
