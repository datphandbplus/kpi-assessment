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
exports.CommonValidator = void 0;
const url = require("url");
const jwt = require("jsonwebtoken");
const error_constants_1 = require("../interfaces/error_constants");
const SequeLize = require('sequelize');
const Op = SequeLize.Op;
const CONFIG = require('../../config/config');
const DB_CONFIG = CONFIG['development'] ? CONFIG['development'] : (CONFIG['staging'] ? CONFIG['staging'] : CONFIG['production']);
const HASH = {
    JWT_HASH_KEY: '1c24171393dc5de04ffcb21f1182ab28',
    CRYPTO_HASH_KEY: '0c82a54f22f775a3ed8b97b2dea74036',
    PASSWORD_HASH_KEY: 'In4E1s3KvVAyWhZS4yARylbadeYqYPxM65Nc2V8z',
    EXPIRE_DAYS: '30d',
};
class CommonValidator {
    constructor() {
        this.sequelize = new SequeLize(DB_CONFIG.path1, {
            operatorsAliases: false,
            logging: false,
            define: {
                timestamps: false
            }
        });
        this.HREmployee = this.sequelize.define('hr_employee', {
            department_id: { type: SequeLize.INTEGER, allowNull: false },
            email: { type: SequeLize.STRING, allowNull: false },
            full_name: { type: SequeLize.STRING, allowNull: false },
            position: { type: SequeLize.STRING, allowNull: false },
            is_active: { type: SequeLize.INTEGER, allowNull: false }
        });
    }
    validateToken() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                var parsed_url = url.parse(req.url, true);
                var token = (req.body && req.body.access_token) || parsed_url.query.access_token || req.headers["x-access-token"] || req.headers['access_token'] || req.headers['accesstoken'];
                if (token) {
                    var that = this;
                    jwt.verify(token, HASH.JWT_HASH_KEY, function (err, decoded) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (err) {
                                return res.status(401).json({ "success": false, "message": error_constants_1.ErrorConstants.INVALID_TOKEN['message'], code: error_constants_1.ErrorConstants.INVALID_TOKEN['code'] });
                            }
                            else {
                                let userAuth = yield that.HREmployee.findOne({
                                    where: {
                                        email: { [Op.like]: `${decoded.email}%` }
                                    }
                                });
                                if (userAuth != null) {
                                    if (new Date(decoded.timeExpired) < new Date()) {
                                        return res.status(401).json({ "success": false, "message": error_constants_1.ErrorConstants.SESSION_EXPIRED['message'], code: error_constants_1.ErrorConstants.SESSION_EXPIRED['code'] });
                                    }
                                    req.user = userAuth;
                                    req.user.roles = ['user'];
                                    next();
                                }
                                else {
                                    return res.status(401).json({ "success": false, "message": error_constants_1.ErrorConstants.INVALID_TOKEN['message'], code: error_constants_1.ErrorConstants.INVALID_TOKEN['code'] });
                                }
                            }
                        });
                    });
                }
                else {
                    return res.status(404).json({ "success": false, "message": error_constants_1.ErrorConstants.UNAUTHORIZED['message'], code: error_constants_1.ErrorConstants.UNAUTHORIZED['code'] });
                }
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    validateAdmin() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                var parsed_url = url.parse(req.url, true);
                var token = (req.body && req.body.access_token) || parsed_url.query.access_token || req.headers["x-access-token"] || req.headers['access_token'];
                if (token) {
                    var that = this;
                    jwt.verify(token, HASH.JWT_HASH_KEY, function (err, decoded) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (err) {
                                return res.status(401).json({ "success": false, "message": error_constants_1.ErrorConstants.INVALID_TOKEN['message'], code: error_constants_1.ErrorConstants.INVALID_TOKEN['code'] });
                            }
                            else {
                                let userAuth = yield that.HREmployee.findOne({
                                    where: {
                                        email: { [Op.like]: `${decoded.email}%` }
                                    }
                                });
                                if (userAuth != null) {
                                    if (new Date(decoded.timeExpired) < new Date()) {
                                        return res.status(401).json({ "success": false, "message": error_constants_1.ErrorConstants.SESSION_EXPIRED['message'], code: error_constants_1.ErrorConstants.SESSION_EXPIRED['code'] });
                                    }
                                    if (DB_CONFIG.admin_list.indexOf(userAuth.email) !== -1) {
                                        req.user = userAuth;
                                        req.user.roles = ['admin'];
                                        next();
                                    }
                                    else {
                                        return res.status(200).json({ "success": false, "message": error_constants_1.ErrorConstants.NOTAUTHORIZED['message'], code: error_constants_1.ErrorConstants.NOTAUTHORIZED['code'] });
                                    }
                                }
                                else {
                                    return res.status(401).json({ "success": false, "message": error_constants_1.ErrorConstants.INVALID_TOKEN['message'], code: error_constants_1.ErrorConstants.INVALID_TOKEN['code'] });
                                }
                            }
                        });
                    });
                }
                else {
                    return res.status(404).json({ "success": false, "message": error_constants_1.ErrorConstants.UNAUTHORIZED['message'], code: error_constants_1.ErrorConstants.UNAUTHORIZED['code'] });
                }
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
}
exports.CommonValidator = CommonValidator;