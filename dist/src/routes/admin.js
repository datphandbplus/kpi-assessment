"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const admin_1 = require("./../controllers/admin");
const common_1 = require("../common");
const common_validator_1 = require("../validators/common_validator");
class Admin extends common_1.RestRouter {
    constructor() {
        super();
        this._adminController = new admin_1.AdminController();
        this._commonValidator = new common_validator_1.CommonValidator();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/login', this._adminController.login);
        this.router.get('/system-info', this._adminController.listUsersInfo);
    }
}
exports.AdminRoutes = Admin;