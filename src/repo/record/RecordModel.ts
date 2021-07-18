import mongoose, { Connection, Model, Schema } from "mongoose";
import { IRecordDocuments } from "../../models/IRecordDocument";

const recordSchema = new Schema<IRecordDocuments>({
    key: { require: true, type: String, unique: true },
    value: { require: true, type: String, unique: true },
    createdAt: { require: true, type: Date, unique: true },
    counts: {
        type: Array,
        of: Number,
    },
});
export function RecordModel(conn: Connection): Model<IRecordDocuments> {
    return conn.model("record", recordSchema);
}
