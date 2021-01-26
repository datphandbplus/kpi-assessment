import { MysqlConnection }  from '../connection_managers/mysql_connection';
import * as _ from 'underscore';
import { Sequelize } from "sequelize";
import * as fs from 'fs';
import * as path from 'path';

class SchemaClient {
    private _models: any = {};
    private _sequelize: Sequelize;

    constructor() {  }

    getModels(tablename: string) {
        var filePath = path.join(__dirname, "../../../models/"+tablename+'.js');
        if(!this._models || !this._models[tablename]){
            this._sequelize =  MysqlConnection.connect();
            if (fs.existsSync(filePath)) {
                let model = this._sequelize.import(filePath);
                this._models[(model as any).name] = model;
                Object.keys(this._models).forEach((modelName: string) => {
                    if (typeof this._models[modelName].associate === "function") {
                        this._models[modelName].associate(this._models);
                    }
                });
                return this._models[tablename];
            }else{
                return null;
            }
        }else{
            return this._models[tablename]
        }
    }

    getSequelize(): Sequelize {
        if(this._sequelize) {
            return this._sequelize;
        } else {
            this._sequelize =  MysqlConnection.connect();
            return this._sequelize;
        }
    }
}


export const schemaClient = new SchemaClient();
