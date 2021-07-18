import ErrorConfig from "./ErrorConfig";

export class DbError extends Error {
    private constructor(message: string) {
        super(message);
        this.name = ErrorConfig.DbError.name;
        this.code = ErrorConfig.DbError.code;

        Object.setPrototypeOf(this, DbError.prototype);
    }

    static getDefaultError(): DbError {
        return new DbError(ErrorConfig.RecordError.messages.default);
    }

    code: number;
    name: string;
}
