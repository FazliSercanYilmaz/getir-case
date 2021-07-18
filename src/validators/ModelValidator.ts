import { plainToClass } from "class-transformer";
import * as jf from "joiful";
import { Constructor } from "joiful/core";
import ErrorConfig from "../error/ErrorConfig";
import { ValidationError } from "../error/ValidationError";
export function ModelValidate<T>(target: any, sourceClass: Constructor<T>): T {
    const result = jf.validateAsClass(target, sourceClass, {
        abortEarly: false,
    });
    if (result.error != null) {
        /*throw new ValidationError(result.error.details.map((elem)=>{
           return elem.message
       }).join(" , "));*/
        throw ValidationError.getDefaultError();
    } else {
        return result.value;
    }
}
