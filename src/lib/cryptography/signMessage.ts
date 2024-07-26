import crypto from 'crypto';
const hash = crypto.createHash('sha256');
import fs from 'fs';
import encrypt from "./encrypt";

const myData = {
  id: "as98d7a98s7d9as7d9a7s9a7s"
};

// String version of our data that can be hashed
const myDataString = JSON.stringify(myData);

// Sets the value on the hash object: requires string format, so we must convert our object
hash.update(myDataString);

// Hashed data in Hexidecimal format
const hashedData = hash.digest('hex');
const senderPrivateKey = fs.readFileSync('../../private-key.pem', 'utf-8');


const signedMessage = encrypt.encryptWithPrivateKey(senderPrivateKey, hashedData);

const packageOfDataToSend = {
  algorithm: 'sha256',
  originalData: myData,
  signedAndEncryptedData: signedMessage
};

module.exports.packageOfDataToSend = packageOfDataToSend;