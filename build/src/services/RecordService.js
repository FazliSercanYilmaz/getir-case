"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordService = void 0;
class RecordService {
    constructor(recordRepo) {
        this.recordRepo = recordRepo;
    }
    async getRecordsByDateAndCountFilter(input) {
        return await this.recordRepo.getRecordsByDateAndCountFilter(input);
    }
}
exports.RecordService = RecordService;
