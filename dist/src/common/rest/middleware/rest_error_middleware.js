"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestErrorMiddleware = void 0;
// @ts-ignore
const serialize_error_1 = require("serialize-error");
const errors_1 = require("../errors");
class RestErrorMiddleware {
    // Error handling middleware that takes an incoming error, normalizes it to some
    // subclass of HttpError and passes it along (to eventually be logged/serialized)
    static normalizeToRestError(err, req, res, next) {
        if (err instanceof errors_1.RestError) {
            return next(err);
        }
        if (err instanceof SyntaxError) {
            return next(new errors_1.InvalidJsonError());
        }
        return next(new errors_1.InternalError(err));
    }
    // This should typically be the last error handling middleware that's mounted by express.
    // This will serialize the error to the user, and log it.
    static serializeRestError(err, req, res, next) {
        if (err instanceof errors_1.InternalError) {
            const logFriendlyErrorMessage = serialize_error_1.default(err.originalError);
        }
        else {
            const logFriendlyErrorMessage = serialize_error_1.default(err);
        }
        // serialize the error
        return res.status(err.httpStatusCode).json({
            error: err
        });
    }
}
exports.RestErrorMiddleware = RestErrorMiddleware;