"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
class SuccessResponse {
    constructor(data) {
        this.data = data;
        this.code = 0;
        this.msg = "Success";
    }
}
exports.SuccessResponse = SuccessResponse;
