"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestError = void 0;
class RestError extends Error {
    constructor(message, httpStatusCode, code) {
        super(message);
        this.message = message;
        this.httpStatusCode = httpStatusCode;
        this.code = code;
        this.name = 'RestError';
        this.stack = new Error().stack;
        this.toJSON();
    }
    toJSON() {
        return {
            code: this.code,
            message: this.message
        };
    }
}
exports.RestError = RestError;