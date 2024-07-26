
// const encrypt = require('./encrypt');
// const decrypt = require('./encrypt');
const fs = require('fs');
const crypt = require('crypto')

function encryptWithPublicKey(publicKey: string, dataToEncrypt: any) {
    // Encrypt Data with Public Key
    return crypt.publicEncrypt({
        key: publicKey,
        padding: crypt.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256', // Use the appropriate hash algorithm
    }, Buffer.from(dataToEncrypt, 'utf-8'));
}

function decryptWithPrivateKey(privatekey: string, encryptedData: any) {
    // Decrypt Data with Private Key
    return crypt.privateDecrypt({
        key: privatekey,
        padding: crypt.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256', // Use the appropriate hash algorithm
    }, encryptedData);
}


const message = "Here is my message to encrypt";
// Read Public Key from File
const publicKey = fs.readFileSync('../../public-key.pem', 'utf-8');
const encryptedData = encryptWithPublicKey(publicKey, message)

// Display Encrypted Dataclear
//base64
console.log('Encrypted Data:\n', encryptedData.toString('base64'));
// Read Private Key from File
const privateKey = fs.readFileSync('../../private-key.pem', 'utf-8');
const data = decryptWithPrivateKey(privateKey, encryptedData)
console.log(data.toString());
