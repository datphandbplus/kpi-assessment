"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestRouter = void 0;
const express = require("express");
class RestRouter {
    constructor() {
        this.router = express.Router();
    }
    wrapParamFn(controller, handlerFn) {
        return (req, res, next, param) => {
            return Promise.resolve(handlerFn.bind(controller)(req, res, next, param))
                .catch(err => next(err));
        };
    }
    wrapRouteFn(controller, handlerFn) {
        return (req, res, next) => {
            return Promise.resolve(handlerFn.bind(controller)(req, res, next))
                .catch(err => next(err));
        };
    }
}
exports.RestRouter = RestRouter;