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
exports.MysqlModel = void 0;
const sequelize_1 = require("sequelize");
const mysql_connection_1 = require("../connection_managers/mysql_connection");
const index_1 = require("./../schemas/index");
// import { schemaClient } from "./../schemas/index"; 
class MysqlModel {
    constructor(modelName) {
        var model = index_1.schemaClient.getModels(modelName);
        this.modelObj = model;
        this.sequelize = index_1.schemaClient.getSequelize();
    }
    //return requelize object
    getSequelize() {
        return this.sequelize;
    }
    findAndCountAll(condition, selectParams, order, limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var obj = {};
                obj['where'] = condition;
                if (selectParams && selectParams.length > 0) {
                    obj['attributes'] = selectParams;
                }
                if (order && order.length > 0) {
                    obj['order'] = order;
                }
                if (limit > 0) {
                    obj['limit'] = limit;
                }
                if (offset > 0) {
                    obj['offset'] = offset;
                }
                obj['raw'] = true;
                return this.modelObj.findAll(obj);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOne(condition, selectParams = []) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var obj = {};
                obj['where'] = condition;
                if (selectParams && selectParams.length > 0) {
                    obj['attributes'] = selectParams;
                }
                return this.modelObj.findOne(obj);
            }
            catch (error) {
                throw error;
            }
        });
    }
    save(data, trans) {
        return new Promise((resolve, reject) => {
            try {
                return this.modelObj.create(data, trans).then(function (item) {
                    resolve(item);
                }).catch(function (err) {
                    reject(err);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    update(condition, data, trans = {}) {
        return new Promise((resolve, reject) => {
            try {
                return this.modelObj.update(data, Object.assign({ where: condition, individualHooks: true }, trans)).then(function (item) {
                    return __awaiter(this, void 0, void 0, function* () {
                        resolve(item);
                    });
                }).catch(function (err) {
                    return __awaiter(this, void 0, void 0, function* () {
                        reject(err);
                    });
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bulkSave(data, trans) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.modelObj.bulkCreate(data, trans);
            }
            catch (error) {
                throw error;
            }
        });
    }
    destroy(condition, trans = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.modelObj.destroy(Object.assign({ where: condition }, trans));
            }
            catch (error) {
                throw error;
            }
        });
    }
    customQuery(query, bind = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mysql_connection_1.MysqlConnection.connect().query(query, { bind, type: sequelize_1.QueryTypes.SELECT });
            }
            catch (error) {
                throw error;
            }
        });
    }
    customQueryUpdate(query, bind = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mysql_connection_1.MysqlConnection.connect().query(query, { bind, type: sequelize_1.QueryTypes.UPDATE });
            }
            catch (error) {
                throw error;
            }
        });
    }
    customQueryDelete(query, bind = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mysql_connection_1.MysqlConnection.connect().query(query, { bind, type: sequelize_1.QueryTypes.DELETE });
            }
            catch (error) {
                throw error;
            }
        });
    }
    customQuerySystemConfig(query, bind = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mysql_connection_1.MysqlConnection.connect().query(query, { bind, type: sequelize_1.QueryTypes.RAW });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.MysqlModel = MysqlModel;