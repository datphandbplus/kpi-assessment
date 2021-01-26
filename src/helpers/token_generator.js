const CryptoJS = require( 'crypto-js' );
const jwt = require( 'jsonwebtoken' );
const HASH = {
    JWT_HASH_KEY		: '1c24171393dc5de04ffcb21f1182ab28',
    CRYPTO_HASH_KEY		: '0c82a54f22f775a3ed8b97b2dea74036',
    PASSWORD_HASH_KEY	: 'In4E1s3KvVAyWhZS4yARylbadeYqYPxM65Nc2V8z',
    EXPIRE_DAYS			: '30d', // 30 days
};

class TokenGenerator {
    /**
     * Encrypt data
     * @static
     * @param {string} data - Data to encrypt
     * @param {boolean} isExpired - Flag to set expired token
     * @param {int} expiresIn - Expire time
     * @return {string} Token encrypted
     */
    static encrypt( data, isExpired = true, expiresIn = 0 ) {
        const options = isExpired ? { expiresIn: expiresIn || CHASH.EXPIRE_DAYS } : {};
        const token = jwt.sign( data, HASH.JWT_HASH_KEY, options );

        return CryptoJS.AES.encrypt( token, CHASH.CRYPTO_HASH_KEY ).toString();
    }

    /**
     * Decrypt token
     * @static
     * @param {string} token - Token need decrypt
     * @return {any} Data decrypted
     */
    static decrypt( token ) {
        let decoded;

        try {
            const bytes = CryptoJS.AES.decrypt( token, CHASH.CRYPTO_HASH_KEY );
            const rawValue = bytes.toString( CryptoJS.enc.Utf8 );

            decoded = jwt.verify( rawValue, CHASH.JWT_HASH_KEY );
        } catch {}

        return decoded;
    }

    /**
     * Decrypt password token
     * @static
     * @param {string} token - Password token need decrypt
     * @return {any} Data decrypted
     */
    static passwordDecrypt( token ) {
        let decoded;

        try {
            const bytes = CryptoJS.AES.decrypt( token, CHASH.PASSWORD_HASH_KEY );
            decoded = bytes.toString( CryptoJS.enc.Utf8 );
        } catch {}

        return decoded;
    }

    /**
     * Check secure hash
     * @static
     * @param {any} hashData
     * @param {any} secureHash
     * @return {boolean}
     */
    static checkSecureHash( hashData, secureHash ) {
        const appSecureHash = CryptoJS.MD5( CHASH.JWT_HASH_KEY + hashData ).toString();
        return appSecureHash === secureHash;
    }

}

module.exports = TokenGenerator;
