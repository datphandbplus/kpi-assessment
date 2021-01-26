"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidResourceUrlError = void 0;
const rest_error_1 = require("./rest_error");
const error_constants_1 = require("../../../interfaces/error_constants");
class InvalidResourceUrlError extends rest_error_1.RestError {
    constructor(message = 'Not a valid resource url.') {
        super(message, 404, error_constants_1.ErrorConstants.INVALID_RESOURCE_URL);
        this.message = message;
        this.name = 'InvalidResourceUrlError';
    }
}
exports.InvalidResourceUrlError = InvalidResourceUrlError;