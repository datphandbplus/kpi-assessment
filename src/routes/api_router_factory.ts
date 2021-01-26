import * as express from 'express';
import { Router } from 'express';
import { MethodNotAllowedError } from '../common';
import { AdminRoutes } from './admin';
import { EmployeeRoutes } from './employee';
import { MailRoutes } from './mail';

import pkg = require('../../package.json');

export class ApiRouterFactory {

    private constructor() {

    }

    static getApiRouter(): Router {
        const router: Router = express.Router();
        const adminRouter: Router = new AdminRoutes().router;
        const employeeRouter: Router = new EmployeeRoutes().router;
        const mailRouter: Router = new MailRoutes().router;

        // Special root path for AWS health check
        router.get('/', function (req, res) {
            res.send({
                name : pkg.name,
                description : pkg.description,
                version : pkg.version
            });
        });

        router.use('/admin', adminRouter);
        router.use('/employees', employeeRouter);
        router.use('/mail', mailRouter);
        router.all('*', (req, res, next) => {
            next(new MethodNotAllowedError());
        });
        return router;
    }
}
