import mongoose from 'mongoose';
const encrypt: any = require('../../src/lib/cryptography/encrypt.js');
const decrypt: any = require('../../src/lib/cryptography/decrypt.js');

import fs from 'fs';


const userAddressSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        address: { type: String },
        suburb: { type: String },
        state: { type: String },
        postcode: { type: String }
    }
)

userAddressSchema.pre('findOneAndUpdate', async function (next) {
    // 'this' refers to the query being executed
    const update = this.getUpdate() as any

    // Check if there is an update and it includes $set
    if (update && ('$set' in update)) {
        const publicKey = fs.readFileSync('public-key.pem', 'utf-8');

        // Iterate over the keys in $set
        for (const key in update.$set) {
            if (
                Object.prototype.hasOwnProperty.call(update.$set, key) &&
                key !== 'userId' && // Exclude userId
                key !== '_id' // Exclude Id (adjust to match your actual field names)
            ) {
                // Apply encryption logic to each field
                const encryptedData = encrypt.encryptWithPublicKey(publicKey, update.$set[key]);
                update.$set[key] = encryptedData.toString('base64');
            }
        }
    }

    next();
});



userAddressSchema.post('findOneAndUpdate', async function (doc: Document | null) {

    const update = this.getUpdate() as any
    if (update?.$set && doc) { // Use optional chaining and type guard
        const privateKey = fs.readFileSync('private-key.pem', 'utf-8');

        for (const key in update.$set) {
            if (
                Object.prototype.hasOwnProperty.call(update.$set, key) &&
                key !== 'userId' && // Exclude userId
                key !== '_id' // Exclude Id (adjust to match your actual field names)
            ) {
                const encryptedData = Buffer.from(update.$set[key], 'base64');
                const result = decrypt.decryptWithPrivateKey(privateKey, encryptedData);
                (doc as any)[key] = result.toString('utf-8');
            }
        }
    }
});

const UserAddress = mongoose.model('Address', userAddressSchema);

export default UserAddress