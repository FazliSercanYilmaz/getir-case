import { CustomError } from "./CustomError";
import ErrorConfig from "./ErrorConfig";

export class RecordError extends CustomError {
    private constructor(message: string) {
        super(
            message,
            ErrorConfig.RecordError.code,
            ErrorConfig.RecordError.name
        );
        Object.setPrototypeOf(this, RecordError.prototype);
    }

    static getDefaultError(): CustomError {
        return new RecordError(ErrorConfig.RecordError.messages.default);
    }

    static getRecordNotFoundError(): CustomError {
        return new RecordError(ErrorConfig.RecordError.messages.recordNotFound);
    }
}
