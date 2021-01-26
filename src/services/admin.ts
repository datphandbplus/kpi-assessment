import {ErrorConstants} from "../interfaces";
import {Common} from '../lib/common';

const SequeLize = require('sequelize');
const Op = SequeLize.Op;
const CONFIG = require('../../config/config');
const DB_CONFIG = CONFIG['development'] ? CONFIG['development'] : (CONFIG['staging'] ? CONFIG['staging'] : CONFIG['production']);

class AdminService {
    private HREmployee: any;
    private sequelize = new SequeLize(DB_CONFIG.path1, {
        operatorsAliases: false,
        logging: false,
        define: {
            timestamps: false
        }
    });

    constructor() {
        this.HREmployee = this.sequelize.define('hr_employee', {
            department_id: {type: SequeLize.INTEGER, allowNull: false},
            email: { type: SequeLize.STRING, allowNull: false},
            full_name: { type: SequeLize.STRING, allowNull: false},
            position: { type: SequeLize.STRING, allowNull: false},
            is_active: { type: SequeLize.INTEGER, allowNull: false}
        });
    }

    listUsersInfo = async () => {
        return new Promise(async (resolve, reject) => {
            const list = await this.HREmployee.findAll({ where: {} });
            const result: any[] = [];
            for (let emp of list) {
                const password = `${(emp.email ? emp.email : '') + '@123'}`;
                result.push({
                    email: emp.email || '',
                    password: Common.cyrb53(password),
                    department_id: emp.department_id
                });
            }
            result.sort(this.cmpFunc);
            resolve(result);
        });
    }

    cmpFunc = (a: any, b: any) => {
        if (a.department_id > b.department_id ) {
            return 1;
        } else if (a.department_id === b.department_id ) {
            return 0;
        }
        return -1;
    }

    // Authenticate the admin and generate a token for login
    authAdmin = async (userData: any) => {
        const _this = this;
        return new Promise(async (resolve, reject) => {
            _this.HREmployee.findOne({
                where: {
                    email: {[Op.like]: `${userData.email}%`}
                }
            }).then(res => {
                if (res) {
                    const rightPassword = `${(userData.email ? ((userData.email.indexOf('@') < 0) ? (userData.email + '@dbplus.com.vn') : userData.email) : '') + '@123'}`;
                    const rightHash =  Common.cyrb53(rightPassword);
                    const userHash =  userData.password;
                    if(rightHash === userHash) {
                        const timeLogin = new Date();
                        Common.getToken(res['dataValues'], timeLogin.setMinutes(timeLogin.getMinutes() + DB_CONFIG.expire_mins)).then( token => {
                            res['dataValues']['token'] = token;
                            res['dataValues']['password'] = userHash;
                            if (DB_CONFIG.admin_list.indexOf(res['dataValues']['email']) !== -1) {
                                res['dataValues']['roles'] = ['admin'];
                            } else {
                                res['dataValues']['roles'] = ['user'];
                            }
                            resolve(res);
                        });
                    } else {
                        reject(ErrorConstants.EMPLOYEE_WRONG_PASS);
                    }
                } else {
                    reject(ErrorConstants.EMPLOYEE_NOT_FOUND);
                }
            });
        });
    }
}

export {AdminService as AdminService};
