# vvdev-auth

Simple auth functions based on crypto that I use in many projects

## Install

```
npm install vvdev-auth
```
## Usage

```
const auth = require('vvdev-auth');
//callbacks
auth.generatePassword(8, (err, pass) => {
    console.log('your new password:', pass);
    auth.hashPassword(pass, (err, hash) => {
        console.log('your pretty hashed password:', hash);
        auth.checkPassword(pass, hash, (err, result) => {
            console.log('does it match?', result);
        });
    });
});

//promises
auth.generatePassword(8)
    .then(anotherPassword => {
        return auth.hashPassword(anotherPassword)
            .then(hash => {
                return auth.checkPassword(anotherPassword, hash)
                    .then(result => {
                        console.log('result', result);
                    });
            });
    })
    .catch(err => {
        console.log('oh no, an error happened', err);
    });
```
## Older verions
Version 1.0.0 switched to native Scrypt implementation and will not support old passwords. If you need to support old hashed passwords, install version 0.1.1 and use hashPassword and checkPassword as synchronous functions.
