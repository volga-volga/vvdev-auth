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
    auth.genPassword(TEST_BYTES_LENGTH, function(err, generatedPassword){
        t.equal(err, null);
        password = generatedPassword;
        console.log(password);
        t.notEqual(password, BASE_PASSWORD);
        t.end();
    });
});
tape('Generating a password with promise-based api', function(t){
    auth.genPassword(TEST_BYTES_LENGTH)
        .then(function(generatedPassword){
            password = generatedPassword;
            console.log(password);
            t.notEqual(password, BASE_PASSWORD);
            t.end();
        })
        .catch(function(err){
            t.fail(err);
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
