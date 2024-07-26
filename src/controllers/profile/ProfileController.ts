import ApiResponse from '../../utils/apiResponse';
import Validation from '../../utils/validation';
import authService from '../../services/AuthService';
import ProfileService from '../../services/ProfileService';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../model/user.js';


const ProfileController = {

    async saveProfile(req: Request, res: Response, next: NextFunction) {
        try {
            //basic validation
            // await Validation.basicValidation(req.body);
            // Loop through the keys in req.body
            const _id = await authService.getUserIDFromJWT(req);
            // Save the results in profile
            const result = await ProfileService.saveUserProfile(req, _id)
            // Respond with a success status and the registered user's information
            return res.status(200).json(new ApiResponse(200, 'Profile Update Confirmation', 'Profile information has been successfully updated.', result));
        } catch (err) {
            next(err)
        }
    },

    async getProfile(req: Request, res: Response, next: NextFunction) {
        try {

            // Loop through the keys in req.body
            const _id = await authService.getUserIDFromJWT(req);
            // Save the results in profile
            let profile = await ProfileService.getUserProfileByID(_id)
            // if results are null return a user object but with emai
            const user = req.user as User
            const result = {
                ...profile?.toObject(),
                "email": user.email
            }

            // // Respond with a success status and the registered user's information
            return res.status(200).json(
                new ApiResponse(200, '','Profile information retrieved successfully', result)
            );
        } catch (err) {
            next(err)
        }
    },

    async saveAddress(req: Request, res: Response, next: NextFunction) {
        try {
            //basic validation
            await Validation.basicValidation(req.body);
            // Loop through the keys in req.body
            const _id = await authService.getUserIDFromJWT(req);
            // Save the results in profile
            const result = await ProfileService.saveAddress(req, _id)
            // Respond with a success status and the registered user's information
            return res.status(200).json(new ApiResponse(200, '','Address information saved successfully', result));
        } catch (err) {
            next(err)
        }
    },

    async getProfileDetails(req: Request, res: Response, next: NextFunction) {
        try {
            // Loop through the keys in req.body
            const _id = await authService.getUserIDFromJWT(req);
            // Save the results in profile
            let result = await ProfileService.profileDetails(_id)
            result = await ProfileService.DecryptProfileDetails(result)
            // Respond with a success status and the registered user's information
            return res.status(200).json(new ApiResponse(200,'', '', result));
        } catch (err) {
            next(err)
        }
    }

}

export default ProfileController