import { model } from "mongoose";
import { DateAndCountFilterRequestDto } from "../dto/DateAndCountFilterRequestDto";
import { CustomError } from "../error/CustomError";
import { IRecordRepo } from "../repo/IRecordRepo";
import { ModelValidate } from "../validators/ModelValidator";

export class RecordService {
    constructor(private readonly recordRepo: IRecordRepo) {}
    async GetRecordsByDateAndCountFilter(
        input: DateAndCountFilterRequestDto
    ): Promise<IRecordFiltered[]> {
        return await this.recordRepo.GetRecordsByDateAndCountFilter(input);
    }
}
