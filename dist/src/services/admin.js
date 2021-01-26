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
exports.AdminService = void 0;
const interfaces_1 = require("../interfaces");
const common_1 = require("../lib/common");
const SequeLize = require('sequelize');
const Op = SequeLize.Op;
const CONFIG = require('../../config/config');
const DB_CONFIG = CONFIG['development'] ? CONFIG['development'] : (CONFIG['staging'] ? CONFIG['staging'] : CONFIG['production']);
class AdminService {
    constructor() {
        this.sequelize = new SequeLize(DB_CONFIG.path1, {
            operatorsAliases: false,
            logging: false,
            define: {
                timestamps: false
            }
        });
        this.listUsersInfo = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const list = yield this.HREmployee.findAll({ where: {} });
                const result = [];
                for (let emp of list) {
                    const password = `${(emp.email ? emp.email : '') + '@123'}`;
                    result.push({
                        email: emp.email || '',
                        password: common_1.Common.cyrb53(password),
                        department_id: emp.department_id
                    });
                }
                result.sort(this.cmpFunc);
                resolve(result);
            }));
        });
        this.cmpFunc = (a, b) => {
            if (a.department_id > b.department_id) {
                return 1;
            }
            else if (a.department_id === b.department_id) {
                return 0;
            }
            return -1;
        };
        // Authenticate the admin and generate a token for login
        this.authAdmin = (userData) => __awaiter(this, void 0, void 0, function* () {
            const _this = this;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                _this.HREmployee.findOne({
                    where: {
                        email: { [Op.like]: `${userData.email}%` }
                    }
                }).then(res => {
                    if (res) {
                        const rightPassword = `${(userData.email ? ((userData.email.indexOf('@') < 0) ? (userData.email + '@dbplus.com.vn') : userData.email) : '') + '@123'}`;
                        const rightHash = common_1.Common.cyrb53(rightPassword);
                        const userHash = userData.password;
                        if (rightHash === userHash) {
                            const timeLogin = new Date();
                            common_1.Common.getToken(res['dataValues'], timeLogin.setMinutes(timeLogin.getMinutes() + DB_CONFIG.expire_mins)).then(token => {
                                res['dataValues']['token'] = token;
                                res['dataValues']['password'] = userHash;
                                if (DB_CONFIG.admin_list.indexOf(res['dataValues']['email']) !== -1) {
                                    res['dataValues']['roles'] = ['admin'];
                                }
                                else {
                                    res['dataValues']['roles'] = ['user'];
                                }
                                resolve(res);
                            });
                        }
                        else {
                            reject(interfaces_1.ErrorConstants.EMPLOYEE_WRONG_PASS);
                        }
                    }
                    else {
                        reject(interfaces_1.ErrorConstants.EMPLOYEE_NOT_FOUND);
                    }
                });
            }));
        });
        this.HREmployee = this.sequelize.define('hr_employee', {
            department_id: { type: SequeLize.INTEGER, allowNull: false },
            email: { type: SequeLize.STRING, allowNull: false },
            full_name: { type: SequeLize.STRING, allowNull: false },
            position: { type: SequeLize.STRING, allowNull: false },
            is_active: { type: SequeLize.INTEGER, allowNull: false }
        });
    }
}
exports.AdminService = AdminService;