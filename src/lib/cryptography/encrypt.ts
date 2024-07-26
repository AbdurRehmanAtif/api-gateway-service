import crypto from 'crypto';


function encryptWithPublicKey(publicKey: string, dataToEncrypt: any) {
    // Encrypt Data with Public Key
    return crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256', // Use the appropriate hash algorithm
    }, Buffer.from(dataToEncrypt, 'utf-8'));

}

function encryptWithPrivateKey(privateKey: string, dataToEncrypt: any) {
    // Encrypt Data with Public Key
    return crypto.privateEncrypt(privateKey, dataToEncrypt);

}

export default {
    encryptWithPublicKey,
    encryptWithPrivateKey
}

