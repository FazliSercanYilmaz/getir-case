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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.mainDbConnection = exports.server = void 0;
require("reflect-metadata");
const expressConfig_1 = __importDefault(require("./expressConfig"));
const ErrorConfig_1 = __importDefault(require("./ErrorConfig"));
const dbConfig_1 = __importDefault(require("./dbConfig"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDoc = __importStar(require("./swagger.json"));
const express_1 = __importDefault(require("express"));
//DI
const DbConnection_1 = require("./repo/record/DbConnection");
const RecordRepo_1 = require("./repo/record/RecordRepo");
const RecordModel_1 = require("./repo/record/RecordModel");
const RecordService_1 = require("./services/RecordService");
const RecordController_1 = require("./controllers/RecordController");
const CustomError_1 = require("./errors/CustomError");
const DbError_1 = require("./errors/DbError");
const ErrorResponse_1 = require("./response/ErrorResponse");
const app = express_1.default();
exports.app = app;
app.use(express_1.default.json());
//Database connection and mongoose model created here
const dbConnection = new DbConnection_1.DbConnection();
const mainDbConnection = dbConnection.connect(dbConfig_1.default.connectionString);
exports.mainDbConnection = mainDbConnection;
const recordModel = RecordModel_1.RecordModel(mainDbConnection);
//Record Repo created then injected into the service and controller to build the Repository-Service Pattern
const recordRepo = new RecordRepo_1.RecordRepo(recordModel);
const recordService = new RecordService_1.RecordService(recordRepo);
const recordController = new RecordController_1.RecordController(recordService);
//Api definition created here
app.post("/", async (req, res, next) => {
    try {
        //Request body sent to record controller to get response instance
        const result = await recordController.getRecordsByDateAndCountFilter(req.body);
        res.status(200).send({
            code: result.code,
            msg: result.msg,
            records: result.data,
        });
    }
    catch (error) {
        //Catching record controller's errors
        next(error);
    }
});
app.use((err, req, res, next) => {
    //Sending bad response for defined errors
    if (err instanceof CustomError_1.CustomError) {
        return res.status(400).send(new ErrorResponse_1.ErrorResponse(err));
    }
    else if (err instanceof DbError_1.DbError) {
        return res.status(500).send(new ErrorResponse_1.ErrorResponse(err));
    }
    else {
        return res.status(501).send({
            code: ErrorConfig_1.default.unknownError.code,
            msg: ErrorConfig_1.default.unknownError.messages.default,
        });
    }
});
app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDoc)); // for swagger
//Creating http server
const server = app.listen(process.env.PORT || expressConfig_1.default.port, () => {
    console.log(`${expressConfig_1.default.port} is listening`);
});
exports.server = server;
