/**
 * Created by xTear on 29.05.17.
 */

'use strict'

let lowdb = require("lowdb");
let lodash = require("lodash");
let util = require("./util");

exports.removeEntry = (alias, callback) => {
    let db = lowdb(util.getDatabase());
    let resCode = db.get("connections")
        .remove({ "Alias" : alias})
        .write();


    if(resCode) {
        return callback("Entry successful removed")
    }
    return callback("Entry couldn't be deleted!")
}