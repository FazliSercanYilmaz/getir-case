import ErrorConfig from "./ErrorConfig";

export class DbError extends Error {
    private constructor(message: string) {
        super(message);
        this.name = ErrorConfig.dbError.name;
        this.code = ErrorConfig.dbError.code;

        Object.setPrototypeOf(this, DbError.prototype);
    }

    static getDefaultError(): DbError {
        return new DbError(ErrorConfig.dbError.messages.default);
    }

    code: number;
    name: string;
}
