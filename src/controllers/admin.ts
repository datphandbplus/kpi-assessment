import {RestController} from './../common';
import {AdminService} from "../services/admin";

class Admin extends RestController {
    private adminService: AdminService;

    constructor() {
        super();
        this.adminService = new AdminService();
    }

    //login admin
    login = async (req, res, next) => {
        try {
            let data: any = await this.adminService.authAdmin(req.body);
            if (data) {
                data.password = undefined;
            }
            return this.respond(res, data);
        } catch (error) {
            return this.respondWithErrorMessage(res, error.message, error.code);
        }
    }

    listUsersInfo = async (req, res, next) => {
        try {
            let data: any = await this.adminService.listUsersInfo();
            return this.respond(res, data);
        } catch (error) {
            return this.respondWithErrorMessage(res, error.message, error.code);
        }
    }
}

export {Admin as AdminController};
