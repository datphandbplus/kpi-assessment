"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("./../common");
const admin_1 = require("../services/admin");
class Admin extends common_1.RestController {
    constructor() {
        super();
        //login admin
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.adminService.authAdmin(req.body);
                if (data) {
                    data.password = undefined;
                }
                return this.respond(res, data);
            }
            catch (error) {
                return this.respondWithErrorMessage(res, error.message, error.code);
            }
        });
        this.listUsersInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.adminService.listUsersInfo();
                return this.respond(res, data);
            }
            catch (error) {
                return this.respondWithErrorMessage(res, error.message, error.code);
            }
        });
        this.adminService = new admin_1.AdminService();
    }
}
exports.AdminController = Admin;