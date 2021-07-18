import { Model } from "mongoose";
import { IRecordFilteredInput } from "../../dto/IRecordFilteredInput";
import { DbError } from "../../error/DbError";
import { RecordError } from "../../error/RecordError";
import { IRecord } from "../../models/IRecord";
import { IRecordDocuments } from "../../models/IRecordDocument";
import { IRecordRepo } from "../IRecordRepo";

export class RecordRepo implements IRecordRepo {
    constructor(private readonly recordModel: Model<IRecordDocuments>) {}

    async getRecordsByDateAndCountFilter(
        input: IRecordFilteredInput
    ): Promise<IRecordFiltered[]> {
        let filteredRecords: IRecordFiltered[] | undefined;

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
        } catch (error) {
            //Catching database error
            throw DbError.getDefaultError();
        }

        if (filteredRecords === undefined || filteredRecords.length == 0) {
            //Catching record error
            throw RecordError.getRecordNotFoundError();
        }

        return filteredRecords as IRecordFiltered[];
    }
}
