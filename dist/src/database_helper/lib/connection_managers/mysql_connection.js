"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlConnection = void 0;
const cls = require("continuation-local-storage");
const SequelizeStatic = require("sequelize");
const Seq = require("sequelize");
const Promise = require('bluebird');
const clsBluebird = require('cls-bluebird');
class MysqlConnection {
    constructor(host, dbName, dialect, username, password, storage) {
        MysqlConnection.host = host;
        MysqlConnection.dbName = dbName;
        MysqlConnection.dialect = dialect;
        MysqlConnection.username = username;
        MysqlConnection.password = password;
        MysqlConnection.storage = storage;
        MysqlConnection.connect();
    }
    static connect() {
        if (this.mysqlInstance)
            return this.mysqlInstance;
        const ns = cls.createNamespace('sequelize-transaction');
        clsBluebird(ns, Promise);
        Seq.useCLS(ns);
        this.mysqlInstance = new SequelizeStatic(MysqlConnection.dbName, MysqlConnection.username, MysqlConnection.password, {
            dialect: MysqlConnection.dialect,
            isolationLevel: SequelizeStatic.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
            host: MysqlConnection.host,
            define: {
                timestamps: false
            },
            pool: {
                max: 10,
                min: 2,
                idle: 30000,
                acquire: 30000
            },
            retry: { match: ['ER_LOCK_DEADLOCK: Deadlock found when trying to get lock; try restarting transaction', 'ER_LOCK_WAIT_TIMEOUT: Lock wait timeout exceeded; try restarting transaction', 'ER_ROW_IS_REFERENCED: Cannot delete or update a parent row: a foreign key constraint fails', 'ER_CANNOT_ADD_FOREIGN: Cannot add foreign key constraint'], max: 3 },
            logging: false
        });
        this.mysqlInstance.sync().then(function () {
            console.log("mysql connection created.");
        });
        return this.mysqlInstance;
    }
}
exports.MysqlConnection = MysqlConnection;