"use strict";
const devlopmentConfig = require("./development_config");
const stageConfig = require("./stage_config");
const productionConfig = require("./production_config");
let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
let config;
let envObject = {
    "development": devlopmentConfig,
    "stage": stageConfig,
    "production": productionConfig
};
config = envObject[env];
module.exports = config;