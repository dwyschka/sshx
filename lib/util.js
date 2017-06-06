/**
 * Created by xTear on 05.06.17.
 */
'use strict'

let path = require("path");
let shell = require("child_process");
let lowdb = require("lowdb");

/**
 * returns user home directory
 * @returns {*}
 */
exports.getHomeDirectory = () => {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
};
/**
 * returns sshx directory in users home folder
 * @returns {*}
 */
exports.getSshxDirectory = () => {
    return path.resolve(this.getHomeDirectory(), ".sshx");
};
/**
 * returns location of db.json
 * @returns {*}
 */
exports.getDatabase = () => {
    return path.resolve(this.getSshxDirectory(), "db.json");
};
/**
 * returns binary path of an external application
 * @param binary
 * @returns {*}
 */
exports.getBinaryPath = (binary) => {
    return shell.execSync("which "+binary);
};

/**
 * returns all aliases
 * @return array
 */
exports.getDatabaseAliases = () => {
    let db = lowdb(this.getDatabase());
    return db.get("connections")
        .map("Alias")
        .value();
};

exports.aliasExists = (alias) => {
    let db = lowdb(this.getDatabase());
    db.defaults({
        "connections" : []
    }).value();

    let params = db.get("connections")
        .find({"Alias": alias})
        .value();

    return !require("lodash").isUndefined(params);

};