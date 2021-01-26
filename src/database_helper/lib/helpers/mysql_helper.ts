import {Transaction, Sequelize, QueryTypes} from "sequelize";
import { MysqlConnection }  from '../connection_managers/mysql_connection';
import * as _ from 'underscore';
import { schemaClient } from "./../schemas/index"; 
// import { schemaClient } from "./../schemas/index"; 
export class MysqlModel {
	public modelObj: any;
	public schema : any;
	public sequelize: Sequelize;
	
	constructor(modelName : any) {
		var model = schemaClient.getModels(modelName);
		this.modelObj = model;
		this.sequelize = schemaClient.getSequelize();
	}

	//return requelize object
	public getSequelize(): Sequelize {
		return this.sequelize;
	}
	
	public async findAndCountAll(condition: object, selectParams: any[],  order: any[], limit: any, offset: any) {
		try{
			var obj = {};
			obj['where'] = condition;
			if(selectParams && selectParams.length > 0){
				obj['attributes'] = selectParams;
			}
			if(order && order.length > 0){
				obj['order'] = order;
			}
			if(limit > 0){
				obj['limit'] = limit;
			}
			if(offset > 0){
				obj['offset'] = offset;
			}
			obj['raw'] = true;
			return this.modelObj.findAll(obj);
		}catch(error){
			throw error;
		}
	}

	public async findOne(condition: object, selectParams: any[] = []) {
		try{
			var obj = {};
			obj['where'] = condition;
			if(selectParams && selectParams.length > 0){
				obj['attributes'] = selectParams;
			}
			return this.modelObj.findOne(obj);
		}catch(error){
			throw error;
		}
	}

	public  save(data: object, trans: any) {
		return new Promise((resolve, reject) => {
			try{
				return this.modelObj.create(data, trans).then(function(item){
					resolve(item);
				}).catch(function (err) {
					reject(err);
				});
			} catch(error) {
				reject(error);
			}
		});
	}

	public update(condition:object, data: object, trans:any = {}) {
		return new Promise((resolve, reject) => {
			try{
				return  this.modelObj.update(data, {where: condition, individualHooks: true, ...trans}).then(async function(item){
					resolve(item);
				}).catch(async function (err) {
					reject(err);
				});
			}catch(error){
				reject(error)
			}
		});
	}

	public  async bulkSave(data: any, trans: any)  {
		try{
			return this.modelObj.bulkCreate(data, trans)
		}catch(error){
			throw error;
		}
	}

	public async destroy(condition:object, trans: any = {}){
		try {
			return this.modelObj.destroy({where: condition, ...trans});
		}catch(error){
			throw error;
		}

	}

	public async customQuery(query: string, bind: any = {}) :Promise<any>{
		try{
			return await MysqlConnection.connect().query(query, { bind , type: QueryTypes.SELECT });
		}catch(error){
			throw error;
		}
	}

	public async customQueryUpdate(query: string, bind: any = {}) :Promise<any>{
		try{
			return await MysqlConnection.connect().query(query, { bind , type: QueryTypes.UPDATE });
		}catch(error){
			throw error;
		}
	}

	public async customQueryDelete(query: string, bind: any = {}) :Promise<any>{
		try{
			return await MysqlConnection.connect().query(query, { bind , type: QueryTypes.DELETE });
		}catch(error){
			throw error;
		}
	}

	public async customQuerySystemConfig(query: string, bind: any = {}) :Promise<any>{
		try{
			return await MysqlConnection.connect().query(query, { bind , type: QueryTypes.RAW });
		}catch(error){
			throw error;
		}
	}
}
