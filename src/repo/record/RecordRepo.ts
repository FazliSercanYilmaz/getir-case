import { Model } from "mongoose";
import { IRecordFilteredInput } from "../../dto/IRecordFilteredInput";
import { DbError } from "../../error/DbError";
import { RecordError } from "../../error/RecordError";
import { IRecord } from "../../models/IRecord";
import { IRecordDocuments } from "../../models/IRecordDocument";
import { IRecordRepo } from "../IRecordRepo";

export class RecordRepo implements IRecordRepo{
    constructor(
        private readonly recordModel:Model<IRecordDocuments>
    ){

    }
   async GetRecordsByDateAndCountFilter(input: IRecordFilteredInput):Promise<IRecordFiltered[]>{
    let filteredRecords  :IRecordFiltered[] | undefined;
    try{
        filteredRecords = await this.recordModel.aggregate([
            { "$match": { createdAt: { $gt: input.startDate, $lt: input.endDate } } }, 
            {
                "$addFields": { //adding new field named totalCount from sum of counts array items
                    "totalCount": {
                        "$sum":'$counts'
                    }
                }
            },
            { "$match": { totalCount: { $gt: input.minCount, $lt: input.maxCount } } }, // filtering documents in range
            { "$project": { "_id": 0, key: 1, createdAt: 1, totalCount: 1 } }, // removing unnecessary columns
        ]) 
        
       }
       catch(error){
           
         throw DbError.getDefaultError();

       }

        if(filteredRecords === undefined || filteredRecords.length == 0){
            throw RecordError.getRecordNotFoundError();
        }
            return filteredRecords as IRecordFiltered[];
        
    
      }
       
      
       
    
}