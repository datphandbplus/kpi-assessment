"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
// @ts-ignore
const SequelizeAuto = require("sequelize-auto");
function generate(dbconfig, config, callback) {
    // @ts-ignore
    let auto = new SequelizeAuto(dbconfig.dbName, dbconfig.username, dbconfig.password, config);
    auto.run(function (err) {
        if (err)
            throw err;
        console.log("Schema initialization done");
        callback(auto);
    });
}
exports.generate = generate;