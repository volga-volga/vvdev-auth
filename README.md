# vvdev-auth

Simple auth functions based on crypto that I use in many projects

## Usage

```
const auth = require('vvdev-auth');
auth.generatePassword(8, function(err, pass){
    console.log('your new password:',pass);
    let hashed_and_salted = auth.hashPassword(pass);
    if(auth.checkPassword('hunter2',hashed_and_salted))
        console.log('logged in');
    else
        console.log('wrong password!');
});
```

## Installation

```
npm install --save vvdev-auth;
```
