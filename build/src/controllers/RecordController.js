"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordController = void 0;
const DateAndCountFilterRequestDto_1 = require("../dto/DateAndCountFilterRequestDto");
const ModelValidator_1 = require("../validators/ModelValidator");
const SuccessResponse_1 = require("../response/SuccessResponse");
class RecordController {
    constructor(recordService) {
        this.recordService = recordService;
    }
    async getRecordsByDateAndCountFilter(body) {
        //Validation for dto and creating validated instance
        const input = ModelValidator_1.modelValidate(body, DateAndCountFilterRequestDto_1.DateAndCountFilterRequestDto);
        //Dto sent to record service to get record model
        const result = await this.recordService.getRecordsByDateAndCountFilter(input);
        return new SuccessResponse_1.SuccessResponse(result);
    }
}
exports.RecordController = RecordController;
