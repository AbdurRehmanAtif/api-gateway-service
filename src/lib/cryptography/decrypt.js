"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
function decryptWithPrivateKey(privatekey, encryptedData) {
    // Decrypt Data with Private Key
    return crypto_1.default.privateDecrypt({
        key: privatekey,
        padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256', // Use the appropriate hash algorithm
    }, encryptedData);
}
function decryptWithPublicKey(p_key, encryptedData) {
    // "Decrypt" the data with the public key (not secure in practice)
    var publicDecrypt = crypto_1.default.publicDecrypt({
        key: p_key,
    }, encryptedData);
    return publicDecrypt.toString('utf-8');
}
exports.default = {
    decryptWithPrivateKey: decryptWithPrivateKey,
    decryptWithPublicKey: decryptWithPublicKey
};
