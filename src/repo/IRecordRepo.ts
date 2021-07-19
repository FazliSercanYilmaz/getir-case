import { IRecordFilteredInput } from "../dto/IRecordFilteredInput";
import { CustomError } from "../errors/CustomError";
import { DbError } from "../errors/DbError";

export interface IRecordRepo {
    getRecordsByDateAndCountFilter(
        input: IRecordFilteredInput
    ): Promise<IRecordFiltered[]>;
}
