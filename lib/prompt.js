/**
 * Created by xTear on 05.06.17.
 */
'use strict'

let prompt = require("prompt");
let util = require("./util");
/**
 * Add Dialog
 * @param callback
 */
exports.addDialog = function(callback) {
    let schema = {
        properties : {
            "Alias" : {
                conform: function(value) {
                    return !util.aliasExists(value);
                },
                required: true,
                message: "Alias currently exists"
            },
            "IP" : {
                pattern: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                message: "No Valid IP",
                required: true
            },
            "Port" : {
                required: true,
                message: "No Valid Port",
                pattern: /[0-9]{1,5}/g
            },
            "Username" : {
                default: "root",
                type: "string",
                required: true

            },
            "Password" : {
                required: true
            }
        }
    };

    prompt.start();
    prompt.get(schema, (err, res) => {
        callback(err, res);
    });

};

exports.removeDialog = (callback) => {
    let schema = {
        properties : {
            confirm: {
                // allow yes, no, y, n, YES, NO, Y, N as answer
                pattern: /^(yes|no|y|n)$/gi,
                description: 'Are you sure to remove the entry ?',
                message: 'Type (y)es/(n)o',
                required: true,
                default: 'no'
            }
        }
    };

    prompt.start();
    prompt.get(schema, (err, res) => {
        callback(err, res);
    });
};