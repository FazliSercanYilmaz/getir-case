import { CustomError } from "../errors/CustomError";
import { DbError } from "../errors/DbError";

export class ErrorResponse implements IResponse<any> {
    constructor(error: CustomError | DbError) {
        this.code = error.code;
        this.msg = error.message;
    }
    code: number;
    msg: string;
}
