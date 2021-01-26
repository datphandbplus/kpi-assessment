"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestResponse = void 0;
const error_constants_1 = require("../../interfaces/error_constants");
class RestResponse {
    constructor(code, data, error) {
        this.code = code;
        this.data = data;
        this.error = error;
        if (data != null && error != null) {
            throw new Error(error_constants_1.ErrorConstants.SHOULD_CONTAINS_ONE_OF_DATA_OR_ERROR);
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
exports.RestResponse = RestResponse;