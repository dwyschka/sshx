/**
 * Created by xTear on 05.06.17.
 */
'use strict'
let fs = require("fs");
let util = require("./util");

exports.initalize = function() {
    let sshxDirectory = util.getSshxDirectory();
    let sshxDb = util.getDatabase();

    try {
        fs.accessSync(sshxDirectory);
    }catch(e){
        fs.mkdirSync(sshxDirectory)
    }

    try {
        fs.accessSync(sshxDb);
    } catch(e) {
        fs.writeFileSync(sshxDb, "{}");
    }

};