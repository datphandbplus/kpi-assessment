"use strict";
let crypto = require('crypto');
let algorithm = 'aes-256-ctr';
let key = 'd6F3Efeq';

let mysqlpassword = 'root';
let encryptPassword = '';

try {
    let cipher = crypto.createCipher(algorithm, key);
    let crypted = cipher.update(mysqlpassword, 'utf8', 'hex');
    crypted += cipher.final('hex');
    encryptPassword = crypted;
} catch(e) {
    encryptPassword = '';
}

console.log('***********************password argument is ******************', mysqlpassword);
console.log('***********************encrypted password is ******************', encryptPassword);