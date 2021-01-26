import * as express from 'express';
import { Router } from 'express';
import * as bodyParser from 'body-parser';
import {ApiRouterFactory} from './routes';
import {RestErrorMiddleware} from './common';
import * as swaggerUi from "swagger-ui-express";
const cors = require( 'cors' );

const cookieParser = require( 'cookie-parser' );

var swaggerDocument = require("./../swagger.json");
var options = {
    customCss: '.swagger-ui .prop-type {color: #55a;} tr.property-row {color: #0065ff} .hljs-attr {color: yellow !important;} .body-param__example {background: rgb(8 92 119);} .swagger-ui .scheme-container .schemes {background: transparent;} .swagger-ui section {background: #e4f1f1;} .swagger-ui .scheme-container {background: #dcffff;} body, .swagger-ui .scheme-container {background: #e4f1f1;} .swagger-ui .topbar { display: none } .swagger-ui .opblock .opblock-summary-description, .swagger-ui .opblock-summary { color: #c1179c !important; border-color: #eccae9; background: aliceblue;}',
    customSiteTitle: "KPI Assessment Document API",
    customfavIcon: "https://report.dbplus.com.vn/favicon.ico"
};

// Creates and configures an ExpressJS web server.
class App {
    public express: express.Application;
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.express.use( cors({
            origin				: [ 'http://kpi.dbplus.com.vn', 'https://kpi.dbplus.com.vn', 'http://192.168.1.153', 'https://192.168.1.153' ],
            methods				: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue	: false,
            optionsSuccessStatus: 204,
        }) );
        this.express.use(bodyParser.json()); // support json encoded bodies
        this.express.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// parse some custom thing into a Buffer
        this.express.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
        this.express.use(bodyParser.text({ type: 'text/html' }))
        this.middleware();
        this.routes();
        this.express.use(this.errorHandler);
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization, Access_Token, x-access-token");
            next();
        });
    }

    // Configure API endpoints.
    private routes(): void {
        const env = process.env.NODE_ENV || 'development';

        const apiRouter: Router = ApiRouterFactory.getApiRouter();

        // Turn off the swagger doc
        // if (env !== 'production') {
        this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
        // }
        this.express.use('/api', apiRouter);
        this.express.use(RestErrorMiddleware.normalizeToRestError);
    }

    private errorHandler (err, req, res, next) {
        if (res.headersSent) {
            return next(err)
        }
        res.status(500)
        res.render('error', { error: err })
    }
}

export default new App().express;
