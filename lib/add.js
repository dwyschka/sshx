/**
 * Created by xTear on 29.05.17.
 */
'use strict'

let lowdb = require("lowdb");
let util = require("./util");
let lodash = require("lodash");

exports.addEntry = (res, callback) => {
    let db = lowdb( util.getDatabase() );

    db.defaults({
        "connections" : []
    }).value();

    if(lodash.isNull(res) || lodash.isUndefined(res)) {
        return callback("Abort");
    }

    let dbRes = db.get("connections")
        .push(res)
        .write();

    if(dbRes) {
        return callback("Entry successful added");
    }
    return callback("Entry wasn't added");
};