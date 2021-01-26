"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestController = void 0;
const rest_response_1 = require("./rest_response");
const errors_1 = require("./errors");
const _ = require("underscore");
class RestController {
    constructor() { }
    respond(res, item, statusCode = 200) {
        const response = new rest_response_1.RestResponse(statusCode, item);
        return res.status(statusCode).json(response);
    }
    respondNoContent(res, statusCode = 204) {
        return res.status(statusCode).json();
    }
    respondWithErrorMessage(res, item, statusCode = 400) {
        const response = new rest_response_1.RestResponse(statusCode, item);
        let error = {};
        error['code'] = statusCode;
        if (item.errors && item.errors.length > 0 && item.errors[0].message) {
            error.data = {
                success: false,
                message: item.errors[0].message
            };
            return res.status(statusCode).json(error);
        }
        if (item.message) {
            let msg = item.message.split(':');
            if (msg[0] == "Error") {
                error.data = {
                    success: false,
                    message: _.isObject(item) ? msg[1] : item
                };
            }
            else {
                error.data = {
                    success: false,
                    message: _.isObject(item) ? msg[0] : item
                };
            }
        }
        else {
            error.data = { success: false,
                message: _.isObject(item) ? item.message : item };
        }
        return res.status(statusCode).json(error);
    }
    validateResourceFound(item) {
        if (item == null) {
            throw new errors_1.ResourceNotFoundError();
        }
    }
    internalErrorOccurred(item) {
        throw new errors_1.InternalError(item);
    }
    throwMethodNotAllowedError(req, res, next) {
        throw new errors_1.MethodNotAllowedError();
    }
}
exports.RestController = RestController;