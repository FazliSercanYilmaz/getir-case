"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../src/index");
describe("API TEST (IT)", () => {
    beforeEach(async () => { });
    it("/ (POST) Success", () => {
        return supertest_1.default(index_1.app)
            .post("/")
            .send({
            startDate: "2016-05-01",
            endDate: "2018-02-02",
            minCount: 1000,
            maxCount: 4000,
        })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toEqual(expect.objectContaining({
                code: 0,
                msg: "Success",
            }));
        });
    });
    it("/ (POST) Validation Error", () => {
        return supertest_1.default(index_1.app)
            .post("/")
            .send({})
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body).toStrictEqual({
                code: 500,
                msg: "Validation Error",
            });
        });
    });
    it("/ (POST) Record not Found Error", () => {
        return supertest_1.default(index_1.app)
            .post("/")
            .send({
            startDate: "2017-12-10",
            endDate: "2018-01-12",
            minCount: 0,
            maxCount: 0,
        })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body).toStrictEqual({
                code: 404,
                msg: "Records not found",
            });
        });
    });
    afterAll(() => {
        index_1.mainDbConnection.close();
        index_1.server.close();
    });
});
