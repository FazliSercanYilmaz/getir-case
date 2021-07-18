export class SuccessResponse<T> implements IResponse<T> {
    constructor(data: T) {
        this.data = data;
        this.code = 0;
        this.msg = "Success";
    }
    data: T;
    code: number;
    msg: string;
}
