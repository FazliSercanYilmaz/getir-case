"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModelValidator_1 = require("../../src/validators/ModelValidator");
const jf = __importStar(require("joiful"));
const ErrorConfig_1 = __importDefault(require("../../src/ErrorConfig"));
jf.joi.ValidationError;
class testUserModel {
    constructor(email, username, password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }
}
__decorate([
    (jf.string().email().required()),
    __metadata("design:type", String)
], testUserModel.prototype, "email", void 0);
__decorate([
    (jf.string().min(8).max(16).required()),
    __metadata("design:type", String)
], testUserModel.prototype, "username", void 0);
__decorate([
    (jf.string().min(8).max(16).required()),
    __metadata("design:type", String)
], testUserModel.prototype, "password", void 0);
const testFunction = (input) => {
    try {
        return { data: ModelValidator_1.modelValidate(input, testUserModel) };
    }
    catch (error) {
        return { error };
    }
};
describe("ModelValidator function test", () => {
    it("Success Case", () => {
        var _a, _b, _c;
        const testInput = {
            email: "sercan123@gmail.com",
            username: "merhaba1",
            password: "12345678",
        };
        const result = testFunction(testInput);
        expect(result).toBeDefined();
        expect(result.data).toBeDefined();
        expect(result.error).toBeUndefined();
        expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.username).toBe(testInput.username);
        expect((_b = result.data) === null || _b === void 0 ? void 0 : _b.password).toBe(testInput.password);
        expect((_c = result.data) === null || _c === void 0 ? void 0 : _c.email).toBe(testInput.email);
    });
    it("Validation Error Case for email format", () => {
        var _a, _b, _c;
        const testInput = {
            email: "sercan123@@@",
            username: "merhaba1",
            password: "12345678",
        };
        const result = testFunction(testInput);
        expect(result).toBeDefined();
        expect(result.error).toBeDefined();
        expect((_a = result.error) === null || _a === void 0 ? void 0 : _a.code).toBe(ErrorConfig_1.default.validationError.code);
        expect((_b = result.error) === null || _b === void 0 ? void 0 : _b.name).toBe(ErrorConfig_1.default.validationError.name);
        expect((_c = result.error) === null || _c === void 0 ? void 0 : _c.message).toBe(ErrorConfig_1.default.validationError.messages.default);
    });
    it("Validation Error Case for username max lenght", () => {
        var _a, _b, _c;
        const testInput = {
            email: "sercan123@gmail.com",
            username: "merhaba12345678894",
            password: "12345678",
        };
        const result = testFunction(testInput);
        expect(result).toBeDefined();
        expect(result.error).toBeDefined();
        expect(result.error).not.toBeUndefined();
        expect((_a = result.error) === null || _a === void 0 ? void 0 : _a.code).toBe(ErrorConfig_1.default.validationError.code);
        expect((_b = result.error) === null || _b === void 0 ? void 0 : _b.name).toBe(ErrorConfig_1.default.validationError.name);
        expect((_c = result.error) === null || _c === void 0 ? void 0 : _c.message).toBe(ErrorConfig_1.default.validationError.messages.default);
    });
    it("Testing Validation Error Case for username min length", () => {
        var _a, _b, _c;
        const testInput = {
            email: "sercan123@gmail.com",
            username: "12",
            password: "12345678",
        };
        const result = testFunction(testInput);
        expect(result).toBeDefined();
        expect(result.error).toBeDefined();
        expect(result.error).not.toBeUndefined();
        expect((_a = result.error) === null || _a === void 0 ? void 0 : _a.code).toBe(ErrorConfig_1.default.validationError.code);
        expect((_b = result.error) === null || _b === void 0 ? void 0 : _b.name).toBe(ErrorConfig_1.default.validationError.name);
        expect((_c = result.error) === null || _c === void 0 ? void 0 : _c.message).toBe(ErrorConfig_1.default.validationError.messages.default);
    });
    it("Testing Validation Error Case for password max length", () => {
        var _a, _b, _c;
        const testInput = {
            email: "sercan123@gmail.com",
            username: "merhaba1",
            password: "12345678910111213141516",
        };
        const result = testFunction(testInput);
        expect(result).toBeDefined();
        expect(result.error).toBeDefined();
        expect(result.error).not.toBeUndefined();
        expect((_a = result.error) === null || _a === void 0 ? void 0 : _a.code).toBe(ErrorConfig_1.default.validationError.code);
        expect((_b = result.error) === null || _b === void 0 ? void 0 : _b.name).toBe(ErrorConfig_1.default.validationError.name);
        expect((_c = result.error) === null || _c === void 0 ? void 0 : _c.message).toBe(ErrorConfig_1.default.validationError.messages.default);
    });
    it("Testing Validation Error Case for password min length", () => {
        var _a, _b, _c;
        const testInput = {
            email: "sercan123@gmail.com",
            username: "merhaba1",
            password: "1",
        };
        const result = testFunction(testInput);
        expect(result).toBeDefined();
        expect(result.error).toBeDefined();
        expect(result.error).not.toBeUndefined();
        expect((_a = result.error) === null || _a === void 0 ? void 0 : _a.code).toBe(ErrorConfig_1.default.validationError.code);
        expect((_b = result.error) === null || _b === void 0 ? void 0 : _b.name).toBe(ErrorConfig_1.default.validationError.name);
        expect((_c = result.error) === null || _c === void 0 ? void 0 : _c.message).toBe(ErrorConfig_1.default.validationError.messages.default);
    });
});
