import * as jf from "joiful";
import { Constructor } from "joiful/core";
import { ValidationError } from "../errors/ValidationError";
export function modelValidate<T>(target: any, sourceClass: Constructor<T>): T {
    //Validation Class
    const result = jf.validateAsClass(target, sourceClass, {
        abortEarly: false,
    });
    //Catching validation error
    if (result.error != null) {
        throw ValidationError.getDefaultError();
    } else {
        return result.value;
    }
}
