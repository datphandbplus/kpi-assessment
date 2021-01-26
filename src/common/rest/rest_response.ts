import { ErrorConstants } from '../../interfaces/error_constants';
export class RestResponse {
    constructor(public code?: any, public data?: any, public error?: any) {
        if (data != null && error != null) {
            throw new Error(ErrorConstants.SHOULD_CONTAINS_ONE_OF_DATA_OR_ERROR);
        }
    }

    toJSON() {
        return {
            code: this.code,
            data: this.data,
            error: this.error
        };
    }
}
