import crypto from 'crypto';
import fs from 'fs'

// Generate Key Pair
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // You can adjust the length based on your security requirements
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    },
});


// Write Private Key to File
fs.writeFileSync('private-keyReact.pem', privateKey, 'utf-8');
console.log('Private Key written to private-key.pem');

// Write Public Key to File
fs.writeFileSync('public-keyReact.pem', publicKey, 'utf-8');
console.log('Public Key written to public-key.pem');
