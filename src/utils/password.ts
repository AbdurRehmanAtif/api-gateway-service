import crypto = require('crypto')
import jwt = require('jsonwebtoken')
import path = require('path')
import fs = require('fs')

const path_To_Key = path.join('private-key.pem');
const private_Key = fs.readFileSync(path_To_Key, 'utf-8');

// Function to generate a password hash and salt
function generatePassword(password: string) {
    // Generate a random salt
    var salt = crypto.randomBytes(32).toString('hex');
    // Generate a hash using PBKDF2 with the provided password and salt
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');
    // Return the generated salt and hash
    return {
        salt: salt,
        hash: genHash
    }
}
// Function to verify a password against a hash and salt
function verifyPassword(password: string, hash: string, salt: string) {
    // Generate a hash using PBKDF2 with the provided password and salt
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');
    // Compare the generated hash with the provided hash
    return hash === hashVerify;
}
/**
* Generates a JSON Web Token (JWT) for the given user.
* @param {any} user - The user object containing at least an _id property.
* @returns {Object} An object containing the generated JWT token and its expiration time.
*/
function issueJWT(user: any) {
    // Extract user ID and set token expiration time
    const _id = user._id;
    const expiresIn = "1d";

    // Prepare JWT payload with subject (sub) and issued at (iat) timestamp
    const payload = {
        sub: _id,
        iat: Date.now()
    };

    // Sign the JWT using RS256 algorithm and the private key
    const token = jwt.sign(payload, private_Key, {
        expiresIn: expiresIn,
        algorithm: 'RS256'
    });

    // Return the JWT token in Bearer format along with expiration time
    return {
        token: token,
        expires: expiresIn
    };

}

export { verifyPassword, generatePassword, issueJWT };
