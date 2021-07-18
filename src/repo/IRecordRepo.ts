import { IRecordFilteredInput } from "../dto/IRecordFilteredInput";
import { CustomError } from "../error/CustomError";
import { DbError } from "../error/DbError";

export interface IRecordRepo {
    getRecordsByDateAndCountFilter(
        input: IRecordFilteredInput
    ): Promise<IRecordFiltered[]>;
}
