export abstract class CustomError extends Error {
    constructor(message: string, code: number, name: string) {
        super(message);
        this.code = code;
        this.name = name;

        Object.setPrototypeOf(this, CustomError.prototype);
    }
    code: number;
    name: string;
}
