import { DateAndCountFilterRequestDto } from "../dto/DateAndCountFilterRequestDto";
import { IRecordRepo } from "../repo/IRecordRepo";

export class RecordService {
    constructor(private readonly recordRepo: IRecordRepo) {}

    async getRecordsByDateAndCountFilter(
        input: DateAndCountFilterRequestDto
    ): Promise<IRecordFiltered[]> {
        return await this.recordRepo.getRecordsByDateAndCountFilter(input);
    }
}
