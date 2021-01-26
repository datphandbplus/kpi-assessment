import   * as generate from './lib/generate';
import {MysqlConnection} from './lib/connection_managers/mysql_connection';
import { schemaClient } from "./lib/schemas/index";
export * from './lib/helpers/mysql_helper';
export * from  './lib/connection_managers/mysql_connection';

// TODO: Name it something else.
export class DatabaseHelper {

    static isSchemaGenerated: boolean;
    static dbName : string;
    static dialect : string;
    static username : string;
    static password : string;
    static storage : string;
    static config : {};
    static dbConfig : {};

    constructor (host:string, dbName : string, dialect : string, username : string, password : string, storage : string) {
        DatabaseHelper.config = {};
        DatabaseHelper.dbConfig = {};
        DatabaseHelper.config['tables'] =  '';
        DatabaseHelper.config['logging'] =  false;
        DatabaseHelper.config['directory'] =  __dirname+'/lib/schemas';
        DatabaseHelper.config['camelCase'] = false;
        DatabaseHelper.config['host'] =  host;
        DatabaseHelper.dbConfig['dbName'] =  dbName;
        DatabaseHelper.dbConfig['dialect'] =  dialect;
        DatabaseHelper.dbConfig['username'] =  username;
        DatabaseHelper.dbConfig['password'] =  password;
        DatabaseHelper.dbConfig['storage'] =  storage;
        new MysqlConnection(host, dbName, dialect, username, password, storage);
    }

}
/*
export { MysqlConnection } from './lib/connection_managers/mysql_connection';
*/
