const crypto = require('crypto');
exports.genPassword = function(length, callback){
    return new Promise(function(resolve, reject){
        crypto.randomBytes(length, function(err, buffer){
            if(err)
            {
                reject(err);
                if(callback && typeof(callback === 'function'))
                    callback(err);
            }
            else 
            {
                let password = buffer.toString('hex');
                resolve(password);
                if(callback && typeof(callback === 'function'))
                    callback(null, password);
            }
        });
    });
};
exports.generatePassword = exports.genPassword;
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
    return (crypto.timingSafeEqual(Buffer.from(salt+hash.digest('hex')),Buffer.from(hashed_password)));
};
