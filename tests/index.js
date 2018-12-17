const tape = require('tape');
const auth = require('../index');

const TEST_BYTES_LENGTH = 5;
const BASE_PASSWORD = 'THIS PASSWORD IS NOT GENERATED';
const BASE_HASH = 'HASHING WENT WRONG';
let password = BASE_PASSWORD;
let hash = BASE_HASH;

tape('Callback: Generating a password', t => {
    auth.genPassword(TEST_BYTES_LENGTH, (err, generatedPassword) => {
        t.equal(err, null);
        password = generatedPassword;
        console.log(password);
        t.notEqual(password, BASE_PASSWORD);
        t.end();
    });
});
tape('Promise: Generating a password', t => {
    auth.genPassword(TEST_BYTES_LENGTH)
        .then(generatedPassword => {
            password = generatedPassword;
            console.log(password);
            t.notEqual(password, BASE_PASSWORD);
            t.end();
        })
        .catch(err => {
            t.fail(err);
        });
});
tape('Callback: Hashing the generated password', function(t){
    auth.hashPassword(password, (err, hashedPassword) => {
        t.equal(err, null);
        console.log(hashedPassword);
        hash = hashedPassword;
        t.end();
    });
});
tape('Callback: Checking the hashed password', function(t){
    auth.checkPassword(password, hash, (err, result) => {
        t.equal(err, null);
        t.ok(result);
        t.end();
    });
});
tape('Promise: Hashing the generated password', function(t){
    auth.hashPassword(password)
        .then(hashedPassword => {
            console.log(hashedPassword);
            hash = hashedPassword;
            t.end();
        })
        .catch(err => {
            t.fail(err);
        });
});
tape('Promise: Checking the hashed password', function(t){
    auth.checkPassword(password, hash)
        .then(result => {
            t.ok(result);
            t.end();
        })
        .catch(err => {
            t.fail(err);
        });
});
