/* jshint esversion: 6, node:true */
'use strict';
const crypto = require('crypto');
exports.genPassword = function(length, callback){
    crypto.randomBytes(length, function(err, buffer){
        if(!err) callback(err, buffer.toString('hex'));
        else callback(err, buffer);
    });
};
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
    return (crypto.timingSafeEqual(Buffer(salt+hash.digest('hex')),Buffer(hashed_password)));
};
