import crypto from 'crypto';

function decryptWithPrivateKey(privatekey: string, encryptedData: any) {
    // Decrypt Data with Private Key
    return crypto.privateDecrypt({
        key: privatekey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256', // Use the appropriate hash algorithm
    }, encryptedData);
}

function decryptWithPublicKey(p_key: string, encryptedData: any) {

    // "Decrypt" the data with the public key (not secure in practice)
    const publicDecrypt = crypto.publicDecrypt({
        key: p_key,
    }, encryptedData);
    return publicDecrypt.toString('utf-8');
}

export default {
    decryptWithPrivateKey,
    decryptWithPublicKey
}