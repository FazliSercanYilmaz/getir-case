import "reflect-metadata";
import express, { NextFunction, request, Request, Response } from "express";
import { Connection } from "mongoose";
import dbConfig from "./dbConfig";
import swaggerUi from "swagger-ui-express";
import * as swaggerDoc from "./swagger.json";

import { IRecordRepo } from "./repo/IRecordRepo";
import { RecordRepo } from "./repo/record/RecordRepo";
import { RecordModel } from "./repo/record/RecordModel";
import { RecordService } from "./service/RecordService";
import { RecordController } from "./controllers/RecordController";
import { CustomError } from "./error/CustomError";
import { DbConnection } from "./repo/record/DbConnection";
import { DbError } from "./error/DbError";
import expressConfig from "./expressConfig";

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

        res.status(200).send(result);
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
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc)); // for swagger

//Creating http server
const server = app.listen(expressConfig.port, () => {
    console.log(`${expressConfig.port} is listening`);
});

export { server, mainDbConnection, app };
