/**
 * Created by xTear on 29.05.17.
 */
'use strict'
let lowdb = require("lowdb");
let lodash = require("lodash");
let util = require("./util");

exports.show = (alias, callback) => {
    let db = lowdb( util.getDatabase() );

    let entry = db.get("connections")
        .find({"Alias" : alias})
        .value();

    let os = require("os");
    let msg = os.EOL;

    Object.keys(entry).forEach((key) => {
       msg += key + " : " + entry[key] + os.EOL
    });

    return callback(msg);
};