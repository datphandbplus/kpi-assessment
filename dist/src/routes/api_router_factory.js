"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRouterFactory = void 0;
const express = require("express");
const common_1 = require("../common");
const admin_1 = require("./admin");
const employee_1 = require("./employee");
const mail_1 = require("./mail");
const pkg = require("../../package.json");
class ApiRouterFactory {
    constructor() {
    }
    static getApiRouter() {
        const router = express.Router();
        const adminRouter = new admin_1.AdminRoutes().router;
        const employeeRouter = new employee_1.EmployeeRoutes().router;
        const mailRouter = new mail_1.MailRoutes().router;
        // Special root path for AWS health check
        router.get('/', function (req, res) {
            res.send({
                name: pkg.name,
                description: pkg.description,
                version: pkg.version
            });
        });
        router.use('/admin', adminRouter);
        router.use('/employees', employeeRouter);
        router.use('/mail', mailRouter);
        router.all('*', (req, res, next) => {
            next(new common_1.MethodNotAllowedError());
        });
        return router;
    }
}
exports.ApiRouterFactory = ApiRouterFactory;