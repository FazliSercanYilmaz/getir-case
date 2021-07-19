import { CustomError } from "./CustomError";
import ErrorConfig from "../ErrorConfig";

export class RecordError extends CustomError {
    private constructor(message: string) {
        super(
            message,
            ErrorConfig.recordError.code,
            ErrorConfig.recordError.name
        );
        Object.setPrototypeOf(this, RecordError.prototype);
    }

    static getDefaultError(): CustomError {
        return new RecordError(ErrorConfig.recordError.messages.default);
    }

    static getRecordNotFoundError(): CustomError {
        return new RecordError(ErrorConfig.recordError.messages.recordNotFound);
    }
}
