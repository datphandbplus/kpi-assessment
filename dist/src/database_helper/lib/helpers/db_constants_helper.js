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
exports.DbConstantsHelper = void 0;
const mysql_helper_1 = require("./mysql_helper");
const code_constants_1 = require("../../../interfaces/code_constants");
class DbConstantsHelper {
    static fetchConstants() {
        return new Promise((resolve, reject) => {
            if (Object.keys(this.dbConstants).length > 0) {
                resolve(this.dbConstants);
            }
            try {
                let models = [
                    code_constants_1.CodeConstants.ROLE_MODEL,
                    code_constants_1.CodeConstants.RACE_TYPE_MODEL,
                    code_constants_1.CodeConstants.RACE_STATUS_MODEL,
                    code_constants_1.CodeConstants.CHALLENGE_TYPE_MODEL,
                    code_constants_1.CodeConstants.BOOKING_TYPE_MODEL,
                    code_constants_1.CodeConstants.INVITE_STATUS_MODEL,
                    code_constants_1.CodeConstants.USER_RACE_STATUS_MODEL,
                    code_constants_1.CodeConstants.TSHIRT_SIZES_MODEL,
                    code_constants_1.CodeConstants.CHALLENGE_STATUS_MODEL
                ];
                let promises = this.getFindAllPromises(models);
                Promise.all([...promises]).then((data) => {
                    models.forEach((model, index) => {
                        this.dbConstants[model] = data[index];
                    });
                    resolve(this.dbConstants);
                }).catch((error) => {
                    console.log(error);
                    console.log("\n\n Error in fetching dbconstants \n\n");
                    reject(error);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    static getDbConstants() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fetchConstants();
        });
    }
    ;
    static getFindAllPromises(models) {
        var promises = models.map((model) => {
            let modelObj = new mysql_helper_1.MysqlModel(model);
            return modelObj.findAndCountAll({}, [], [], 0, 0);
        });
        return promises;
    }
}
exports.DbConstantsHelper = DbConstantsHelper;
DbConstantsHelper.dbConstants = {};