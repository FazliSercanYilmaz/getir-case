"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnection = void 0;
const mongoose_1 = require("mongoose");
class DbConnection {
    connect(connectionString) {
        return mongoose_1.createConnection(connectionString);
    }
    end(cnn) {
        cnn.close();
    }
}
exports.DbConnection = DbConnection;
