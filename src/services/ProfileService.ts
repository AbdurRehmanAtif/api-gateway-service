import { Profile } from '../model/Profile';
import UserAddress from '../model/address';
import decrypt from '../lib/cryptography/decrypt';
import fs from 'fs';
import ApiError from '../utils/apiError';
import mongoose from 'mongoose';

const { Types: { ObjectId } } = mongoose;
interface Arg {
    [key: string]: any; // Allow any property name with any value type
}

const ProfileService = {

    /**
 * Saves or updates a user profile in the database.
 * 
 * @param {Object} req - The request object, containing the user profile data in the request body.
 * @param {string} _id - The user ID used to identify the user profile.
 * @returns {Promise<Object>} A promise that resolves to the saved or updated user profile.
 * @throws {ApiError} If an error occurs during the database query or any other asynchronous operation.
 */

    async getUserProfileByID(_id: string) {

        try {
            // Find and update or create a user profile in the database
            const result = await Profile.findOne(
                { userId: _id }
            ).select('-userId');

            return result;
        
        } catch (error: any) {
            // If an error occurs during the database query or any other asynchronous operation,
            // reject the promise with the caught error for consistent error handling
            throw new ApiError({ success: false, statusCode: 404, title: "Something went wrong!", message: error.message });
        }
    },

    async saveUserProfile(req: any, _id: string) {
        try {
            // Extract user profile data from the request body
            let requestData = req.body;
            // Add userID to the user profile data
            const userId = _id;
            requestData = {
                userId,
                ...requestData
            };
            // Find and update or create a user profile in the database
            const results = await Profile.findOneAndUpdate(
                { userId: userId },  // The filter criteria for finding the document to update
                { $set: requestData },  // The update operation - sets the fields in `requestData`
                {
                    upsert: true,  // If no document matches the filter, create a new one
                    new: true,  // Return the modified document rather than the original
                    setDefaultsOnInsert: true  // Sets default values if a new document is inserted
                }
            ).select('-userId');
            // Return the saved or updated user profile
            return this.getUserProfileByID(_id)
        
        } catch (error: any) {
            // If an error occurs during the database query or any other asynchronous operation,
            // reject the promise with the caught error for consistent error handling
            throw new ApiError({ success: false, statusCode: 404, title: "Something went wrong!", message: error.message });
        }
    },



    async saveAddress(req: any, _id: string) {
        try {
            // Extract user profile data from the request body
            let requestData = req.body;
            // Add userID to the user profile data
            const userId = _id;
            requestData = {
                userId,
                ...requestData
            };
            // Find and update or create a user profile in the database
            const results = await UserAddress.findOneAndUpdate(
                { userId: userId },
                { $set: requestData },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            ).select('-userId');
            // Return the saved or updated user profile
            return results;


        } catch (error: any) {
            // If an error occurs during the database query or any other asynchronous operation,
            // reject the promise with the caught error for consistent error handling
            throw new ApiError({ success: false, statusCode: 404, title: "Something went wrong!", message: error.message });
        }
    },

    async profileDetails(_id: string) {
        try {

            const result = await Profile.aggregate([
                {
                    $match: { userId: new ObjectId(_id) }
                },
                {
                    $lookup: {
                        from: "addresses", // The name of the second collection
                        localField: 'userId', // The field from the first collection
                        foreignField: 'userId', // The field from the second collection
                        as: 'address'
                    }
                },
                {
                    $project: {
                        "address.userId": 0, // Exclude userId from the address field
                        "address._id": 0,   // Exclude _id from the address field
                        userId: 0,          // Exclude userId from the main document
                        _id: 0              // Exclude _id from the main document
                        // Add other fields you want to include in the result
                    }
                }
            ]);

            return result;

        } catch (error: any) {
            // If an error occurs during the database query or any other asynchronous operation,
            // reject the promise with the caught error for consistent error handling
            throw new ApiError({ success: false, statusCode: 404, title: "Something went wrong!", message: error.message });
        }
    },

    async DecryptProfileDetails(data: any) {

        try {
            if (data.length > 0) {
                const parsedArray = [];
                let addr = [];
                if (data[0].address.length > 0) {
                    addr = data[0].address[0];
                }

                const privateKey = fs.readFileSync('private-key.pem', 'utf-8');

                for (const key in data[0]) {
                    if (key !== 'address' && key !== '__v') {
                        const value = data[0][key];
                        const arg: Arg = {}
                        arg[key] = decryptValue(value)
                        parsedArray.push(arg);
                    }
                }

                for (const key in addr) {
                    if (key != '__v') {
                        const value = addr[key];
                        const arg: Arg = {}
                        arg[key] = decryptValue(value)
                        parsedArray.push(arg);
                    }
                }

                function decryptValue(value: any) {
                    const encryptedData = Buffer.from(value, 'base64');
                    const result = decrypt.decryptWithPrivateKey(privateKey, encryptedData)
                    return result.toString('utf-8');
                }

                return parsedArray;
            }
            return []
        } catch (error: any) {
            // If an error occurs during the database query or any other asynchronous operation,
            // reject the promise with the caught error for consistent error handling
            throw new ApiError({ success: false, statusCode: 404, title: "Something went wrong!", message: error.message });
        }
    }
}


export default ProfileService