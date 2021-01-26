"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodNotAllowedError = void 0;
const rest_error_1 = require("./rest_error");
const error_constants_1 = require("../../../interfaces/error_constants");
class MethodNotAllowedError extends rest_error_1.RestError {
    constructor(message = 'The endpoint does not support this HTTP method.') {
        super(message, 405, error_constants_1.ErrorConstants.METHOD_NOT_ALLOWED);
        this.message = message;
        this.name = 'MethodNotAllowedError';
    }
}
exports.MethodNotAllowedError = MethodNotAllowedError;