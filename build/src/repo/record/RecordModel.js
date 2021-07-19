"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordModel = void 0;
const mongoose_1 = require("mongoose");
const recordSchema = new mongoose_1.Schema({
    key: { require: true, type: String, unique: true },
    value: { require: true, type: String, unique: true },
    createdAt: { require: true, type: Date, unique: true },
    counts: {
        type: Array,
        of: Number,
    },
});
function RecordModel(conn) {
    return conn.model("record", recordSchema);
}
exports.RecordModel = RecordModel;
