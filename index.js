const crypto = require('crypto');
function makeCallbackFunction(callback)
{
    if(!callback || typeof(callback) !== 'function')
        callback = new Function();
    return callback;
}
exports.genPassword = (length, callback) => {
    callback = makeCallbackFunction(callback);
    return new Promise((resolve, reject) => {
        crypto.randomBytes(length, (err, buffer) => {
            if(err) {
                reject(err);
                callback(err);
            } else {
                const password = buffer.toString('hex');
                resolve(password);
                callback(null, password);
            }
        });
    });
};
exports.generatePassword = exports.genPassword;
exports.hashPassword = (password, callback) => {
    callback = makeCallbackFunction(callback);
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(64);
        crypto.scrypt(password, salt, 64, (err, key) => {
            if(err) {
                reject(err);
                callback(err);
            } else {
                const result = Buffer.concat([salt, key]).toString('hex');
                resolve(result);
                callback(null, result);
            }
        });
    });
};
exports.checkPassword = (password, hash, callback) => {
    callback = makeCallbackFunction(callback);
    return new Promise((resolve, reject) => {
        const salt = Buffer.from(hash.substring(0,128), 'hex');
        crypto.scrypt(password, salt, 64, (err, key) => {
            if(err) {
                reject(err);
                callback(err);
            } else try {
                const left = key;
                const right = Buffer.from(hash.substring(128), 'hex');
                const result = crypto.timingSafeEqual(left, right);
                resolve(result);
                callback(null, result);
            } catch(err) {
                reject(err);
                callback(err);
            }
        });
    });
};
