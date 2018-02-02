/* jshint esversion: 6, node:true */
/* eslint no-console: true */
'use strict';
const tape = require('tape');
const auth = require('../index');

const TEST_BYTES_LENGTH = 5;
const BASE_PASSWORD = 'THIS PASSWORD IS NOT GENERATED';
const BASE_HASH = 'HASHING WENT WRONG';
var password = BASE_PASSWORD;
var hashedPassword = BASE_HASH;

tape('Generating a password', function(t){
    auth.genPassword(TEST_BYTES_LENGTH, function(err, buffer){
        t.equal(err, null);
        password = buffer.toString('hex');
        console.log(password);
        t.notEqual(password, BASE_PASSWORD);
        t.end();
    });
});
tape('Hashing the generated password', function(t){
    t.notEqual(password, BASE_PASSWORD);
    hashedPassword = auth.hashPassword(password);
    console.log(hashedPassword);
    t.notEqual(hashedPassword, BASE_HASH);
    t.end();
});
tape('Checking the hashed password', function(t){
    t.notEqual(password, BASE_PASSWORD);
    t.notEqual(hashedPassword, BASE_HASH);
    t.ok(auth.checkPassword(password, hashedPassword));
    t.end();
});
