// const encrypt = require('./encrypt');
// const decrypt = require('./encrypt');
var fs = require('fs');
var crypt = require('crypto');
function encryptWithPublicKey(publicKey, dataToEncrypt) {
    // Encrypt Data with Public Key
    return crypt.publicEncrypt({
        key: publicKey,
        padding: crypt.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256', // Use the appropriate hash algorithm
    }, Buffer.from(dataToEncrypt, 'utf-8'));
}
function decryptWithPrivateKey(privatekey, encryptedData) {
    // Decrypt Data with Private Key
    return crypt.privateDecrypt({
        key: privatekey,
        padding: crypt.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256', // Use the appropriate hash algorithm
    }, encryptedData);
}
var message = "Here is my message to encrypt";
// Read Public Key from File
var publicKey = fs.readFileSync('../../public-key.pem', 'utf-8');
var encryptedData = encryptWithPublicKey(publicKey, message);
// Display Encrypted Dataclear
//base64
console.log('Encrypted Data:\n', encryptedData.toString('base64'));
// Read Private Key from File
var privateKey = fs.readFileSync('../../private-key.pem', 'utf-8');
var data = decryptWithPrivateKey(privateKey, encryptedData);
console.log(data.toString());
