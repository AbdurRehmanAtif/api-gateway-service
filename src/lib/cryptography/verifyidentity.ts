import crypto from 'crypto';
import decrypt from './decrypt';
import fs from 'fs';

function verifuIdentity() {

    // This is the data that we are receiving from the sender
    const receivedData = require('../cryptography/signMessage').packageOfDataToSend;

    const hash = crypto.createHash(receivedData.algorithm);
    const publicKey = fs.readFileSync('../../public-key.pem', 'utf-8');
    const decryptedMessage = decrypt.decryptWithPublicKey(publicKey, receivedData.signedAndEncryptedData);
    const decryptedMessageHex = decryptedMessage;

    hash.update(JSON.stringify(receivedData.originalData));
    const hashOfOriginalHex = hash.digest('hex');

    if (hashOfOriginalHex === decryptedMessageHex) {
        return true;
    } else {
        return false;
    }
}