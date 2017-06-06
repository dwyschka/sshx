#!/usr/bin/env node

/**
 * Created by xTear on 29.05.17.
 */

'use strict';

const caporal = require("caporal");
const prompt = require("./lib/prompt");
const lowdb = require("lowdb");
const util = require("./lib/util");

require("./lib/init.js").initalize();

caporal
    .version(require("./package.json").version)
    //Add Entry to Database
    .command("add", "add entry to local database")
    .alias("a")
    .action((args, options, logger) => {
        prompt.addDialog((err, res) => {
            if(err) {
                logger.error(err);
                process.exit();
            }
            require("./lib/add").addEntry(res, (msg) => {
                 logger.info(msg);
                 process.exit();
            });
        });
    })
    //Removes entry from database
    .command("remove", "removes entry from local database")
    .alias("r")
    .argument("<alias>", "alias in database")
    .complete(() => {
        return util.getDatabaseAliases();
    })
    .action((args, options, logger) => {
        if(util.aliasExists(args.alias)) {
            logger.error("Entry doesn't exist")
            process.exit();
        }
        prompt.removeDialog((err,res) => {
           if(err) {
               logger.error(err);
               process.exit();
           }
           let confirm = res.confirm.toLowerCase();
           if(confirm != 'y' && confirm != 'yes') {
               logger.info("abort");
               process.exit();
           }
           require("./lib/remove").removeEntry(args.alias, (msg) => {
               logger.info(msg);
               process.exit();
           });
        });
    })
    //Shows Information about the given alias
    .command("info", "shows info about the given alias")
    .alias("i")
    .argument("<alias>", "alias in database")
    .complete(() => {
        return util.getDatabaseAliases();
    })
    .action((args, options, logger) => {
        if(!util.aliasExists(args.alias)) {
            logger.error("Entry doesn't exist")
            process.exit();
        }
        require("./lib/info").show(args.alias, (msg) => {
            logger.info(msg);
            process.exit();
        })
    })
    //Connect to Host
    .command("connect", "removes entry from local database")
    .default()
    .alias("c")
    .argument("<alias>", "Alias from Database")
    .complete(() => {
        return util.getDatabaseAliases();
    })
    .action((args, options, logger) => {
        if(!util.aliasExists(args.alias)) {
            logger.error("Entry doesn't exist")
            process.exit();
        }
        return require("./lib/connection").connect(args.alias, logger);
    });

caporal.parse(process.argv);
