import { CustomError } from "./CustomError";
import ErrorConfig from "./ErrorConfig";

export class ValidationError extends CustomError {
    private constructor(message: string) {
        super(
            message,
            ErrorConfig.validationError.code,
            ErrorConfig.validationError.name
        );
        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    static getDefaultError(): CustomError {
        return new ValidationError(
            ErrorConfig.validationError.messages.default
        );
    }
}
