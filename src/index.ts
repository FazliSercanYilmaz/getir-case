import "reflect-metadata";

import expressConfig from "./expressConfig";
import ErrorConfig from "./ErrorConfig";
import dbConfig from "./dbConfig";

import swaggerUi from "swagger-ui-express";
import * as swaggerDoc from "./swagger.json";

import express, { NextFunction, Request, Response } from "express";
import { Connection } from "mongoose";

//DI
import { DbConnection } from "./repo/record/DbConnection";
import { IRecordRepo } from "./repo/IRecordRepo";
import { RecordRepo } from "./repo/record/RecordRepo";
import { RecordModel } from "./repo/record/RecordModel";
import { RecordService } from "./services/RecordService";
import { RecordController } from "./controllers/RecordController";

import { CustomError } from "./errors/CustomError";
import { DbError } from "./errors/DbError";
import { ErrorResponse } from "./response/ErrorResponse";

const app = express();
app.use(express.json());

//Database connection and mongoose model created here
const dbConnection: IDbConnection<Connection> = new DbConnection();
const mainDbConnection = dbConnection.connect(dbConfig.connectionString);
const recordModel = RecordModel(mainDbConnection);

//Record Repo created then injected into the service and controller to build the Repository-Service Pattern
const recordRepo: IRecordRepo = new RecordRepo(recordModel);
const recordService: RecordService = new RecordService(recordRepo);
const recordController: RecordController = new RecordController(recordService);

//Api definition created here
app.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        //Request body sent to record controller to get response instance
        const result = await recordController.getRecordsByDateAndCountFilter(
            req.body
        );

        res.status(200).send({
            code: result.code,
            msg: result.msg,
            records: result.data,
        });
    } catch (error) {
        //Catching record controller's errors
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
        //Sending bad response for defined errors
        if (err instanceof CustomError) {
            return res.status(400).send(new ErrorResponse(err));
        } else if (err instanceof DbError) {
            return res.status(500).send(new ErrorResponse(err));
        } else {
            return res.status(501).send({
                code: ErrorConfig.unknownError.code,
                msg: ErrorConfig.unknownError.messages.default,
            });
        }
    }
);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc)); // for swagger

//Creating http server
const server = app.listen(process.env.PORT || expressConfig.port, () => {
    console.log(`${expressConfig.port} is listening`);
});

export { server, mainDbConnection, app };
