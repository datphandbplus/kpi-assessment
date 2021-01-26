"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(name, message) {
        super(name);
        Object.setPrototypeOf(this, CustomError.prototype);
        this.name = name;
        this.message = message;
    }
    echo() {
        return { name: this.name, message: this.message };
    }
}
exports.CustomError = CustomError;