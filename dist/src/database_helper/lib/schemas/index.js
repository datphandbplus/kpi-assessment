"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaClient = void 0;
const mysql_connection_1 = require("../connection_managers/mysql_connection");
const fs = require("fs");
const path = require("path");
class SchemaClient {
    constructor() {
        this._models = {};
    }
    getModels(tablename) {
        var filePath = path.join(__dirname, "../../../models/" + tablename + '.js');
        if (!this._models || !this._models[tablename]) {
            this._sequelize = mysql_connection_1.MysqlConnection.connect();
            if (fs.existsSync(filePath)) {
                let model = this._sequelize.import(filePath);
                this._models[model.name] = model;
                Object.keys(this._models).forEach((modelName) => {
                    if (typeof this._models[modelName].associate === "function") {
                        this._models[modelName].associate(this._models);
                    }
                });
                return this._models[tablename];
            }
            else {
                return null;
            }
        }
        else {
            return this._models[tablename];
        }
    }
    getSequelize() {
        if (this._sequelize) {
            return this._sequelize;
        }
        else {
            this._sequelize = mysql_connection_1.MysqlConnection.connect();
            return this._sequelize;
        }
    }
}
exports.schemaClient = new SchemaClient();