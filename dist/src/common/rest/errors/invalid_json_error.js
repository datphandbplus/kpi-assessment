"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidJsonError = void 0;
const rest_error_1 = require("./rest_error");
const error_constants_1 = require("../../../interfaces/error_constants");
class InvalidJsonError extends rest_error_1.RestError {
    constructor(message = 'Request does not contain valid JSON data.') {
        super(message, 400, error_constants_1.ErrorConstants.INVALID_JSON_ERR);
        this.message = message;
        this.name = 'InvalidJsonError';
    }
}
exports.InvalidJsonError = InvalidJsonError;