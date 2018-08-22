/**
 * Created by xTear on 29.05.17.
 */
'use strict'

let lowdb = require("lowdb");
let util = require("./util");
let lodash = require("lodash");
let shell = require("child_process").spawn;
/**
 * Create connection over sshpass, and return context to current shell
 * @param alias
 * @param logger
 */
exports.connect = (alias, logger) => {
  let db = lowdb(util.getDatabase());
  let sshpass = util.getBinaryPath("sshpass").toString().trim();
  let ssh = util.getBinaryPath("ssh").toString().trim();

  if(lodash.isNull(ssh) || lodash.isEmpty(ssh) || lodash.isUndefined(ssh)) {
      logger.error("ssh is not defined");
      process.exit();
  }

  if(lodash.isNull(sshpass) || lodash.isEmpty(sshpass) || lodash.isUndefined(sshpass)) {
        logger.error("sshpass is not defined");
        process.exit();
  }

  let dbParams = db.get("connections")
      .find({"Alias" : alias})
      .value();

  if(lodash.isUndefined(dbParams.KeyAuth) || dbParams.KeyAuth == "no") {
    return shell(sshpass, ["-p", dbParams.Password, ssh, dbParams.Username+"@"+dbParams.IP, "-p", dbParams.Port, "-oStrictHostKeyChecking=no"], {
        stdio: "inherit"
    });
  }
  return shell(ssh, [dbParams.Username+"@"+dbParams.IP, "-p", dbParams.Port, "-oStrictHostKeyChecking=no"]);


};