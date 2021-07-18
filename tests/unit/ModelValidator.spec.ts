import { modelValidate } from "../../src/validators/ModelValidator";
import * as jf from "joiful";
import { ValidationError } from "../../src/error/ValidationError";
import { CustomError } from "../../src/error/CustomError";
import ErrorConfig from "../../src/error/ErrorConfig";
jf.joi.ValidationError;
class testUserModel {
    constructor(email: string, username: string, password: string) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    @(jf.string().email().required())
    email: string;

    @(jf.string().min(8).max(16).required())
    username: string;

    @(jf.string().min(8).max(16).required())
    password: string;
}
const testFunction = (input: testUserModel) => {
    try {
        return { data: modelValidate<testUserModel>(input, testUserModel) };
    } catch (error) {
        return { error };
    }
};

describe("ModelValidator function test", () => {
    it("Success Case", () => {
        const testInput = {
            email: "sercan123@gmail.com",
            username: "merhaba1",
            password: "12345678",
        };
        const result = testFunction(testInput);
        expect(result).toBeDefined();
        expect(result.data).toBeDefined();
        expect(result.error).toBeUndefined();
        expect(result.data?.username).toBe(testInput.username);
        expect(result.data?.password).toBe(testInput.password);
        expect(result.data?.email).toBe(testInput.email);
    });

    it("Validation Error Case for email format", () => {
        const testInput = {
            email: "sercan123@@@",
            username: "merhaba1",
            password: "12345678",
        };
        const result = testFunction(testInput);
        expect(result).toBeDefined();
        expect(result.error).toBeDefined();
        expect(result.error?.code).toBe(ErrorConfig.validationError.code);
        expect(result.error?.name).toBe(ErrorConfig.validationError.name);
        expect(result.error?.message).toBe(
            ErrorConfig.validationError.messages.default
        );
    });

    it("Validation Error Case for username max lenght", () => {
        const testInput = {
            email: "sercan123@gmail.com",
            username: "merhaba12345678894",
            password: "12345678",
        };
        const result = testFunction(testInput);
        expect(result).toBeDefined();
        expect(result.error).toBeDefined();
        expect(result.error).not.toBeUndefined();
        expect(result.error?.code).toBe(ErrorConfig.validationError.code);
        expect(result.error?.name).toBe(ErrorConfig.validationError.name);
        expect(result.error?.message).toBe(
            ErrorConfig.validationError.messages.default
        );
    });

    it("Testing Validation Error Case for username min length", () => {
        const testInput = {
            email: "sercan123@gmail.com",
            username: "12",
            password: "12345678",
        };
        const result = testFunction(testInput);
        expect(result).toBeDefined();
        expect(result.error).toBeDefined();
        expect(result.error).not.toBeUndefined();
        expect(result.error?.code).toBe(ErrorConfig.validationError.code);
        expect(result.error?.name).toBe(ErrorConfig.validationError.name);
        expect(result.error?.message).toBe(
            ErrorConfig.validationError.messages.default
        );
    });

    it("Testing Validation Error Case for password max length", () => {
        const testInput = {
            email: "sercan123@gmail.com",
            username: "merhaba1",
            password: "12345678910111213141516",
        };
        const result = testFunction(testInput);
        expect(result).toBeDefined();
        expect(result.error).toBeDefined();
        expect(result.error).not.toBeUndefined();
        expect(result.error?.code).toBe(ErrorConfig.validationError.code);
        expect(result.error?.name).toBe(ErrorConfig.validationError.name);
        expect(result.error?.message).toBe(
            ErrorConfig.validationError.messages.default
        );
    });

    it("Testing Validation Error Case for password min length", () => {
        const testInput = {
            email: "sercan123@gmail.com",
            username: "merhaba1",
            password: "1",
        };
        const result = testFunction(testInput);
        expect(result).toBeDefined();
        expect(result.error).toBeDefined();
        expect(result.error).not.toBeUndefined();
        expect(result.error?.code).toBe(ErrorConfig.validationError.code);
        expect(result.error?.name).toBe(ErrorConfig.validationError.name);
        expect(result.error?.message).toBe(
            ErrorConfig.validationError.messages.default
        );
    });
});
