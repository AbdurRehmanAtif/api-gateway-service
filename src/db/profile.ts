import mongoose, { Types } from 'mongoose';
import CryptographicService from '../lib/security/CryptographicService';

// Define the interface for the User document
interface ProfileDocument {
    userId: Types.ObjectId,
    firstName: string;
    lastName?: string;
    dob?: string;
    mobile?: string;
    about?: string;
    gender?: string;
    avatar?: string;
    coverImage?: string;
}


const cryptoService = new CryptographicService();

const userProfileSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        firstName: { type: String },
        lastName: { type: String },
        dob: { type: String },
        mobile: { type: String },
        about: { type: String },
        gender: { type: String },
        avatar: { type: String },
        coverImage: { type: String },
    });


userProfileSchema.pre('findOneAndUpdate', async function (next) {
    // 'this' refers to the query being executed
    const update = this.getUpdate();
    console.log("Fnd one and update working")
    // Check if there is an update and it includes $set
    if (update && ('$set' in update)) {
        const publicKey = cryptoService.PublicKey()

        // Iterate over the keys in $set
        for (const key in update.$set) {
            if (
                Object.prototype.hasOwnProperty.call(update.$set, key) &&
                key !== 'userId' && // Exclude userId
                key !== '_id' &&
                key !== '__v'// Exclude Id (adjust to match your actual field names)/
            ) {
                // Apply encryption logic to each field
                const encryptedData = cryptoService.encryptWithPublicKey(publicKey, update.$set[key]);
                update.$set[key] = encryptedData.toString();
            }
        }
    }
    next();
}
);


userProfileSchema.post('findOne', async function (doc) {

    if (doc) {
        const privateKey = cryptoService.privateKey()

        for (const key in doc._doc) {
            if (
                Object.prototype.hasOwnProperty.call(doc._doc, key) &&
                key !== 'userId' && // Exclude userId
                key !== '_id' &&
                key !== '__v'// Exclude Id (adjust to match your actual field names)
            ) {
                const encryptedData = Buffer.from(doc._doc[key], 'base64');
                console.log("findOne worked ", encryptedData)
                const result = cryptoService.decryptWithPrivateKey(privateKey, encryptedData);
                doc[key] = result.toString('utf-8');
            }
        }
    }
});

const userProfile = mongoose.model('Profile', userProfileSchema);

export { userProfile, ProfileDocument }
