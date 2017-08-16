/* jshint esversion: 6, node:true */
'use strict';
const crypto = require('crypto');
exports.hashPassword = function(password){
    let salt = crypto.randomBytes(64).toString('hex');
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return salt+hash.digest('hex');
};
exports.checkPassword = function(password,hashed_password){
    let salt = hashed_password.substring(0,128);
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return (salt+hash.digest('hex') == hashed_password);
};
