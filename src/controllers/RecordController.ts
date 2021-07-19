import { DateAndCountFilterRequestDto } from "../dto/DateAndCountFilterRequestDto";
import { RecordService } from "../services/RecordService";
import { modelValidate } from "../validators/ModelValidator";
import { SuccessResponse } from "../response/SuccessResponse";

export class RecordController {
    constructor(private readonly recordService: RecordService) {}

    async getRecordsByDateAndCountFilter(
        body: any
    ): Promise<IResponse<IRecordFiltered[]>> {
        //Validation for dto and creating validated instance
        const input: DateAndCountFilterRequestDto =
            modelValidate<DateAndCountFilterRequestDto>(
                body,
                DateAndCountFilterRequestDto
            );

        //Dto sent to record service to get record model
        const result = await this.recordService.getRecordsByDateAndCountFilter(
            input
        );

        return new SuccessResponse<IRecordFiltered[]>(result);
    }
}
