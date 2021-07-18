import { IRecordFilteredInput } from "./IRecordFilteredInput";
import * as jf from "joiful";

export class DateAndCountFilterRequestDto implements IRecordFilteredInput {
    constructor(
        startDate: Date,
        endDate: Date,
        minCount: number,
        maxCount: number
    ) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.minCount = minCount;
        this.maxCount = maxCount;
    }

    @(jf.date().required())
    startDate: Date;
    @(jf.date().required())
    endDate: Date;
    @(jf.number().required())
    minCount: number;
    @(jf.number().required())
    maxCount: number;
}
