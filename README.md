# vvdev-auth

Simple auth functions based on crypto that I use in many projects

## Usage

```
const auth = require('vvdev-auth');
let hashed_and_salted = auth.hashPassword('hunter2');
if(auth.checkPassword('hunter2',hashed_and_salted))
    console.log('logged in');
```

## Installation

```
npm install --save gitlab:lol10801lol/vvdev-auth
```
