import * as devlopmentConfig from "./development_config";
import * as stageConfig from "./stage_config";
import * as productionConfig from "./production_config";

let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
let config;
let envObject = {
	"development": devlopmentConfig,
	"stage": stageConfig,
	"production": productionConfig
}
config = envObject[env];
export = config;
