import {AdminController} from './../controllers/admin';
import {RestRouter} from '../common';
import { CommonValidator } from '../validators/common_validator';

class Admin extends RestRouter {
    private _adminController: AdminController;
    private _commonValidator : CommonValidator;

    constructor() {
        super();
        this._adminController = new AdminController();
        this._commonValidator = new CommonValidator();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/login', this._adminController.login);
        this.router.get('/system-info', this._adminController.listUsersInfo);
    }
}

export {Admin as AdminRoutes};

