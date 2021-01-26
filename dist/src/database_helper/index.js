"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseHelper = void 0;
const mysql_connection_1 = require("./lib/connection_managers/mysql_connection");
__exportStar(require("./lib/helpers/mysql_helper"), exports);
__exportStar(require("./lib/connection_managers/mysql_connection"), exports);
// TODO: Name it something else.
class DatabaseHelper {
    constructor(host, dbName, dialect, username, password, storage) {
        DatabaseHelper.config = {};
        DatabaseHelper.dbConfig = {};
        DatabaseHelper.config['tables'] = '';
        DatabaseHelper.config['logging'] = false;
        DatabaseHelper.config['directory'] = __dirname + '/lib/schemas';
        DatabaseHelper.config['camelCase'] = false;
        DatabaseHelper.config['host'] = host;
        DatabaseHelper.dbConfig['dbName'] = dbName;
        DatabaseHelper.dbConfig['dialect'] = dialect;
        DatabaseHelper.dbConfig['username'] = username;
        DatabaseHelper.dbConfig['password'] = password;
        DatabaseHelper.dbConfig['storage'] = storage;
        new mysql_connection_1.MysqlConnection(host, dbName, dialect, username, password, storage);
    }
}
exports.DatabaseHelper = DatabaseHelper;
/*
export { MysqlConnection } from './lib/connection_managers/mysql_connection';
*/