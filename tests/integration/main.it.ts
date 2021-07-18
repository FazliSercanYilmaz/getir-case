import supertest from "supertest";
import { mainDbConnection, server, app } from "../../src/index";

describe("API TEST (e2e)", () => {
    beforeEach(async () => {});

    it("/ (POST) Success", () => {
        return supertest(app)
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
                expect(res.body).toEqual(
                    expect.objectContaining({
                        code: 0,
                        msg: "Success",
                    })
                );
            });
    });

    it("/ (POST) Validation Error", () => {
        return supertest(app)
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
        return supertest(app)
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
        mainDbConnection.close();
        server.close();
    });
});
