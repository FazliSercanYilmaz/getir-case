import { CustomError } from "./CustomError";
import ErrorConfig from "./ErrorConfig";

export class ValidationError extends CustomError {
    private constructor(message: string) {
        super(
            message,
            ErrorConfig.ValidationError.code,
            ErrorConfig.ValidationError.name
        );
        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    static getDefaultError(): CustomError {
        return new ValidationError(
            ErrorConfig.ValidationError.messages.default
        );
    }
}
