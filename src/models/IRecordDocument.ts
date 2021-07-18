import { Document } from "mongoose";
import { IRecord } from "./IRecord";
export interface IRecordDocuments extends Document, IRecord {}
