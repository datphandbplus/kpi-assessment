"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Common = void 0;
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const HASH = {
    JWT_HASH_KEY: '1c24171393dc5de04ffcb21f1182ab28',
    CRYPTO_HASH_KEY: '0c82a54f22f775a3ed8b97b2dea74036',
    PASSWORD_HASH_KEY: 'In4E1s3KvVAyWhZS4yARylbadeYqYPxM65Nc2V8z',
    EXPIRE_DAYS: '30d',
};
const randomstring = require('randomstring');
const ADMINS = ['it@dbplus.com.vn', 'tho.nguyen@dbplus.com.vn', 'nhat.trinh@dbplus.com.vn'];
class Common {
    static cyrb53(str, seed = 0) {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString();
    }
    static encrypt(password) {
        return CryptoJS.AES.encrypt(password, HASH.PASSWORD_HASH_KEY)
            .toString();
    }
    static passwordDecrypt(token) {
        let decoded;
        try {
            const bytes = CryptoJS.AES.decrypt(token, HASH.PASSWORD_HASH_KEY);
            decoded = bytes.toString(CryptoJS.enc.Utf8);
        }
        catch (_a) {
        }
        return decoded;
    }
    static decrypt(token) {
        let decoded;
        try {
            const bytes = CryptoJS.AES.decrypt(token, HASH.CRYPTO_HASH_KEY);
            console.log('bytes', bytes);
            const rawValue = bytes.toString(CryptoJS.enc.Utf8);
            console.log(rawValue);
            decoded = jwt.verify(rawValue, HASH.JWT_HASH_KEY);
        }
        catch (_a) {
        }
        return decoded;
    }
    static dateTimeFormat(dateString) {
        const date = new Date(dateString);
        const aaaa = date.getUTCFullYear();
        let gg = date.getUTCDate();
        const mm = (date.getUTCMonth() + 1);
        if (+gg < 10) {
            gg = '0' + gg;
        }
        const mmA = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const cur_day = mmA[+mm - 1] + ' ' + gg + ', ' + aaaa;
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return cur_day + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    }
    static getToken(userRecord, timeExpired) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let token = yield jwt.sign({
                    email: userRecord['email'],
                    role: ADMINS.indexOf(userRecord['email']) !== -1 ? 1 : 0,
                    timeExpired
                }, HASH.JWT_HASH_KEY);
                return token;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static convertFullname(str) {
        if (str) {
            if (str.indexOf(' ') === -1) {
                return Common.firstCharacterUppercase(str);
            }
            else {
                const strs = str.split(' ');
                const res = [];
                strs.forEach(s => {
                    res.push(Common.firstCharacterUppercase(s));
                });
                return res.join(' ');
            }
        }
        else {
            return '';
        }
    }
    static firstCharacterUppercase(str) {
        let name = str ? str.toLowerCase() : '';
        if (name) {
            name = name.charAt(0).toString().toUpperCase() + name.substr(1);
        }
        return name;
    }
}
exports.Common = Common;