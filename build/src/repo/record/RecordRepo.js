"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordRepo = void 0;
const DbError_1 = require("../../errors/DbError");
const RecordError_1 = require("../../errors/RecordError");
class RecordRepo {
    constructor(recordModel) {
        this.recordModel = recordModel;
    }
    async getRecordsByDateAndCountFilter(input) {
        let filteredRecords;
        try {
            filteredRecords = await this.recordModel.aggregate([
                {
                    //Filtering collection with createAt
                    $match: {
                        createdAt: { $gt: input.startDate, $lt: input.endDate },
                    },
                },
                {
                    //Summing counts for add a new field
                    $addFields: {
                        totalCount: {
                            $sum: "$counts",
                        },
                    },
                },
                {
                    //Filtering collection with new field totalCount
                    $match: {
                        totalCount: {
                            $gt: input.minCount,
                            $lt: input.maxCount,
                        },
                    },
                },
                { $project: { _id: 0, key: 1, createdAt: 1, totalCount: 1 } }, //Removing colums to match model
            ]);
        }
        catch (error) {
            //Catching database error
            throw DbError_1.DbError.getDefaultError();
        }
        if (filteredRecords === undefined || filteredRecords.length == 0) {
            //Catching record error
            throw RecordError_1.RecordError.getRecordNotFoundError();
        }
        return filteredRecords;
    }
}
exports.RecordRepo = RecordRepo;
