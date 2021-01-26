// @ts-ignore
import * as SequelizeAuto from 'sequelize-auto';

export function generate(dbconfig, config, callback) {
    // @ts-ignore
    let auto = new SequelizeAuto(dbconfig.dbName, dbconfig.username, dbconfig.password, config);

    auto.run(function(err) {
        if (err) throw err;
        console.log("Schema initialization done");
        callback(auto);
    })
}
