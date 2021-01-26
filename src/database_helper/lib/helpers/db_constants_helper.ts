import { MysqlModel } from './mysql_helper';
import { CodeConstants } from "../../../interfaces/code_constants";
export class DbConstantsHelper {

    private  static dbConstants = {}
    protected static  fetchConstants() {
        return new Promise((resolve, reject) => {
            if(Object.keys(this.dbConstants).length > 0) {
                resolve(this.dbConstants);
            }
            try{
                let models = [
                    CodeConstants.ROLE_MODEL,
                    CodeConstants.RACE_TYPE_MODEL,
                    CodeConstants.RACE_STATUS_MODEL,
                    CodeConstants.CHALLENGE_TYPE_MODEL,
                    CodeConstants.BOOKING_TYPE_MODEL,
                    CodeConstants.INVITE_STATUS_MODEL,
                    CodeConstants.USER_RACE_STATUS_MODEL,
                    CodeConstants.TSHIRT_SIZES_MODEL,
                    CodeConstants.CHALLENGE_STATUS_MODEL
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
            catch(e){
                reject(e);
            }
        });
    }

    public static async getDbConstants() {
        return await this.fetchConstants();
    };

    protected static getFindAllPromises(models: string[]) {
        var promises = models.map((model) => {
            let modelObj = new MysqlModel(model);
            return modelObj.findAndCountAll({}, [], [], 0, 0);
        });
        return promises
    }

}
