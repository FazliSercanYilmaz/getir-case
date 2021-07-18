import { DateAndCountFilterRequestDto } from "../dto/DateAndCountFilterRequestDto";
import { RecordService } from "../service/RecordService";
import { ModelValidate } from "../validators/ModelValidator";
import { SuccessResponse } from "../response/SuccessResponse";

export class RecordController {
    constructor(private readonly recordService: RecordService) {}
    async getRecordsByDateAndCountFilter(
        body: any
    ): Promise<IResponse<IRecordFiltered[]>> {
        const input: DateAndCountFilterRequestDto =
            ModelValidate<DateAndCountFilterRequestDto>(
                body,
                DateAndCountFilterRequestDto
            );
        const result = await this.recordService.GetRecordsByDateAndCountFilter(
            input
        );
        return new SuccessResponse<IRecordFiltered[]>(result);
    }
}
