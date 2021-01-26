"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = void 0;
const rest_error_1 = require("./rest_error");
const error_constants_1 = require("../../../interfaces/error_constants");
class InternalError extends rest_error_1.RestError {
    constructor(originalError, message = 'An unexpected error has occurred.') {
        super(message, 500, error_constants_1.ErrorConstants.INTERNAL_ERR);
        this.originalError = originalError;
        this.message = message;
        this.name = 'InternalError';
    }
}
exports.InternalError = InternalError;