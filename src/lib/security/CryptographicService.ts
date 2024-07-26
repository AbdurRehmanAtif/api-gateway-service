const fs = require('fs');
const crypt = require('crypto');
const path = require('path');



export default class CryptographicService {

    private PUBLIC_KEY: string = ""
    private PRIVATE_KEY: string = ""

    constructor() {

        this.loadPrivateKey()
        this.loadPublicKey()

    }

    encryptWithPublicKey(publicKey: string, dataToEncrypt: any) {

        return crypt.publicEncrypt({
            key: publicKey,
            padding: crypt.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256', // Use the appropriate hash algorithm
        }, Buffer.from(dataToEncrypt, 'utf-8')).toString('base64')
    }

    decryptWithPrivateKey(privatekey: string, encryptedData: any) {
        // Decrypt Data with Private Key
        return crypt.privateDecrypt({
            key: privatekey,
            padding: crypt.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256', // Use the appropriate hash algorithm
        }, encryptedData);
    }

    /**
     * Signs data using private key encryption.
     * @param data The data to be signed.
     * @returns An object containing algorithm, original data, and signed/encrypted data.
     */

    asymmetricSignData(data: any): any {
        // String version of our data that can be hashed
        const myDataString = JSON.stringify(data);
        const hash = crypt.createHash('sha256');
        // Sets the value on the hash object: requires string format, so we must convert our object
        hash.update(myDataString);
        // Hashed data in Hexidecimal format
        const hashedData = hash.digest('hex');
        const signedMessage = crypt.privateEncrypt(this.PRIVATE_KEY, hashedData);
        return {
            algorithm: 'sha256',
            originalData: data,
            signedAndEncryptedData: signedMessage
        };
    }

    /**
        * Verifies data using public key decryption.
        * @param data The signed/encrypted data to be verified.
        * @returns True if the data is verified, false otherwise.
        */
    asymmetricVerifyData(data: any): boolean {
        try {
            const hash = crypt.createHash(data.algorithm);
            const decryptedMessage = crypt.publicDecrypt({
                key: this.PUBLIC_KEY,
            }, data.signedAndEncryptedData).toString('utf-8');
            const decryptedMessageHex = decryptedMessage;

            hash.update(JSON.stringify(data.originalData));
            const hashOfOriginalHex = hash.digest('hex');

            if (hashOfOriginalHex === decryptedMessageHex) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false; // Return false in case of any error during verification
        }

    }

    loadPrivateKey() {
        try {

            const privateKeyPath = path.resolve(__dirname, '../../../private-key.pem');
            const privateKey = fs.readFileSync(privateKeyPath, 'utf-8');
            if (privateKey.length === 0) {
                console.error('Private key file is empty.');
                // Handle the case where the private key file is empty
            } else {
                this.PRIVATE_KEY = privateKey // Convert Buffer to string
                console.log('Private key loaded successfully.');
            }
        } catch (err) {
            console.error('Error reading private key file:', err);
            // Handle any errors that may occur during file reading
        }
    }

    loadPublicKey() {
        try {
            const publicKeyPath = path.resolve(__dirname, '../../../public-key.pem');
            const publicKey = fs.readFileSync(publicKeyPath, 'utf-8');
            if (publicKey === null) {
                console.error('Private key file not found or empty.');
                // Handle the case where the file is missing or empty
            } else {
                this.PUBLIC_KEY = publicKey
            }
        } catch (err) {
            console.error('Error reading private key file:', err);
            // Handle any other errors that may occur during file reading
        }
    }

    PublicKey() {
        return this.PUBLIC_KEY;
    }
    privateKey() {
        return this.PRIVATE_KEY;
    }
    /**
 * Generates a pair of RSA public and private keys and writes them to files.
 * The keys are stored in PEM format.
 */
    generatePublicAndPrivateKeys() {
        // Generate RSA key pair synchronously with specified parameters
        const { privateKey, publicKey } = crypt.generateKeyPairSync('rsa', {
            modulusLength: 2048, // Adjust the length based on security requirements
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
        fs.writeFileSync('private-key.pem', privateKey, 'utf-8');
        console.log('Private Key written to private-key.pem');

        // Write Public Key to File
        fs.writeFileSync('public-key.pem', publicKey, 'utf-8');
        console.log('Public Key written to public-key.pem');
    }


}