"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceNotFoundError = void 0;
const rest_error_1 = require("./rest_error");
const error_constants_1 = require("../../../interfaces/error_constants");
class ResourceNotFoundError extends rest_error_1.RestError {
    constructor(message = 'The resource could not be found.') {
        super(message, 404, error_constants_1.ErrorConstants.RESOURCE_NOT_FOUND);
        this.message = message;
        this.name = 'ResourceNotFoundError';
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;