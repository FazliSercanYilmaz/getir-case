import "reflect-metadata";
import express, { NextFunction, request, Request, Response } from "express";
import { Connection } from "mongoose";
import { DbConnection } from "./repo/record/DbConnection";
import dbConfig from "./dbConfig";
import { IRecordRepo } from "./repo/IRecordRepo";
import { RecordRepo } from "./repo/record/RecordRepo";
import { RecordModel } from "./repo/record/RecordModel";
import { RecordService } from "./service/RecordService";
import { RecordController } from "./controllers/RecordController";
import { CustomError } from "./error/CustomError";
import { DbError } from "./error/DbError";
import expressConfig from "./expressConfig";

const app = express();
app.use(express.json());

const dbConnection: IDbConnection<Connection> = new DbConnection();
const mainDbConnection = dbConnection.connect(dbConfig.connectionString);
const recordModel = RecordModel(mainDbConnection);

const recordRepo: IRecordRepo = new RecordRepo(recordModel);
const recordService: RecordService = new RecordService(recordRepo);
const recordController: RecordController = new RecordController(recordService);

app.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await recordController.getRecordsByDateAndCountFilter(
            req.body
        );
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

app.use(
    (
        err: CustomError | DbError,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (err instanceof CustomError) {
            return res.status(400).send({
                code: err.code,
                msg: err.message,
            });
        } else if (err instanceof DbError) {
            return res.status(500).send({
                code: err.code,
                msg: err.message,
            });
        } else {
            throw err;
        }
    }
);

const server = app.listen(expressConfig.port, () => {
    console.log(`${expressConfig.port} is listening`);
});

export { server, mainDbConnection, app };
