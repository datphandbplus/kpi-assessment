import * as url from 'url';
import * as jwt from 'jsonwebtoken';
import {ErrorConstants} from '../interfaces/error_constants';
import {MysqlModel} from "../database_helper/lib/helpers/mysql_helper";

const SequeLize = require('sequelize');
const Op = SequeLize.Op;
const CONFIG = require('../../config/config');
const DB_CONFIG = CONFIG['development'] ? CONFIG['development'] : (CONFIG['staging'] ? CONFIG['staging'] : CONFIG['production']);
const HASH = {
    JWT_HASH_KEY: '1c24171393dc5de04ffcb21f1182ab28',
    CRYPTO_HASH_KEY: '0c82a54f22f775a3ed8b97b2dea74036',
    PASSWORD_HASH_KEY: 'In4E1s3KvVAyWhZS4yARylbadeYqYPxM65Nc2V8z',
    EXPIRE_DAYS: '30d', // 30 days
};

export class CommonValidator {
    private HREmployee: MysqlModel;
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

    validateToken() {
        return async(req, res, next) => {
            try {
                var parsed_url = url.parse(req.url, true)
                var token = (req.body && req.body.access_token) || parsed_url.query.access_token || req.headers["x-access-token"] || req.headers['access_token'] || req.headers['accesstoken'];
                if (token) {
                    var that = this;
                    jwt.verify(token, HASH.JWT_HASH_KEY, async function(err, decoded) {
                        if(err){
                            return res.status(401).json({ "success": false, "message": ErrorConstants.INVALID_TOKEN['message'], code: ErrorConstants.INVALID_TOKEN['code']});
                        } else {
                            let userAuth = await that.HREmployee.findOne({
                                where: {
                                    email: { [Op.like]: `${decoded.email}%` }
                                }
                            });
                            if (userAuth != null) {
                                if (new Date(decoded.timeExpired) < new Date()) {
                                    return res.status(401).json({ "success": false, "message": ErrorConstants.SESSION_EXPIRED['message'], code: ErrorConstants.SESSION_EXPIRED['code']});
                                }
                                req.user = userAuth;
                                req.user.roles = ['user'];
                                next();
                            } else {
                                return res.status(401).json({ "success": false, "message": ErrorConstants.INVALID_TOKEN['message'], code: ErrorConstants.INVALID_TOKEN['code']});
                            }
                        }
                    });
                } else {
                    return res.status(404).json({ "success": false, "message": ErrorConstants.UNAUTHORIZED['message'], code: ErrorConstants.UNAUTHORIZED['code']});
                }
            } catch(e) {
                throw new Error(e);
            }
        }
    }

    validateAdmin() {
        return async(req, res, next) => {
            try {
                var parsed_url = url.parse(req.url, true)
                var token = (req.body && req.body.access_token) || parsed_url.query.access_token || req.headers["x-access-token"] || req.headers['access_token'];
                if (token) {
                    var that = this;
                    jwt.verify(token, HASH.JWT_HASH_KEY, async function(err, decoded) {
                        if(err){
                            return res.status(401).json({ "success": false, "message": ErrorConstants.INVALID_TOKEN['message'], code: ErrorConstants.INVALID_TOKEN['code']});
                        }else{
                            let userAuth = await that.HREmployee.findOne({
                                where: {
                                    email: { [Op.like]: `${decoded.email}%` }
                                }
                            });
                            if (userAuth != null) {
                                if (new Date(decoded.timeExpired) < new Date()) {
                                    return res.status(401).json({ "success": false, "message": ErrorConstants.SESSION_EXPIRED['message'], code: ErrorConstants.SESSION_EXPIRED['code']});
                                }
                                if(DB_CONFIG.admin_list.indexOf(userAuth.email) !== -1){
                                    req.user = userAuth;
                                    req.user.roles = ['admin'];
                                    next();
                                } else {
                                    return res.status(200).json({ "success": false, "message": ErrorConstants.NOTAUTHORIZED['message'], code: ErrorConstants.NOTAUTHORIZED['code']});
                                }
                            } else {
                                return res.status(401).json({ "success": false, "message": ErrorConstants.INVALID_TOKEN['message'], code: ErrorConstants.INVALID_TOKEN['code']});
                            }
                        }
                    });
                } else {
                    return res.status(404).json({ "success": false, "message": ErrorConstants.UNAUTHORIZED['message'], code: ErrorConstants.UNAUTHORIZED['code']});
                }
            } catch(e) {
                throw new Error(e);
            }
        }
    }
}
