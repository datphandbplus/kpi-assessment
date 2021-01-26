import * as cls from "continuation-local-storage";
import * as SequelizeStatic from "sequelize";
import { Sequelize } from "sequelize";
import * as Seq from "sequelize";
const Promise = require('bluebird');
const clsBluebird = require('cls-bluebird');

export class MysqlConnection {

    private static mysqlInstance: Sequelize;
    private static host: string;
    private static dbName: string;
    private static dialect: string;
    private static username: string;
    private static password: string;
    private static storage: string;

    constructor (host: string, dbName: string, dialect: string, username: string, password: string, storage: string) {
        MysqlConnection.host =  host;
        MysqlConnection.dbName =  dbName;
        MysqlConnection.dialect =  dialect;
        MysqlConnection.username =  username;
        MysqlConnection.password =  password;
        MysqlConnection.storage =  storage;
        MysqlConnection.connect();
    }

    public static connect (): Sequelize {
        if(this.mysqlInstance) return this.mysqlInstance;

        const ns = cls.createNamespace('sequelize-transaction');
        clsBluebird(ns, Promise);
        Seq.useCLS(ns);

        this.mysqlInstance = new SequelizeStatic( MysqlConnection.dbName,
            MysqlConnection.username,
            MysqlConnection.password,
            {
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
                retry: { match: ['ER_LOCK_DEADLOCK: Deadlock found when trying to get lock; try restarting transaction','ER_LOCK_WAIT_TIMEOUT: Lock wait timeout exceeded; try restarting transaction', 'ER_ROW_IS_REFERENCED: Cannot delete or update a parent row: a foreign key constraint fails', 'ER_CANNOT_ADD_FOREIGN: Cannot add foreign key constraint'], max: 3 },
                logging: false
            }
        );
        this.mysqlInstance.sync().then(function() {
            console.log("mysql connection created.")
        });
        return this.mysqlInstance;
    }
}
