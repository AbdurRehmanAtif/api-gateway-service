// import User from '../model/user.modal';
import mongoose from 'mongoose';
// Assuming the correct path to the User model
import ApiError from '../utils/apiError';
import ApiResponse from '../utils/apiResponse';
import { User, UserRoles } from '../model/user';
import { UsersDocument } from '../db/users';
import { ApiErrorResponse } from '../types/api';
import { authUser } from '../controllers/auth/authControllers';
import { verifyPassword, generatePassword } from "../utils/password";


const authService = {

    async registerUserWithPassword({ email, password }: { email: string, password: string }) {
        // Generate salt and hash for password
        const { salt, hash } = generatePassword(password)
        return await User.register({ email: email, hash: hash, salt: salt })
    },
    async emailNotAlreadyTaken<T>(email: string) {
        const user = await User.findOneByEmail<T>(email);
        if (user) {
            throw new ApiError({ success: false, statusCode: 404, title: "The sign up was not successful.", message: "The entered email already exists" });
        }
        return true;
    },

    async verifyEmail<T>(email: string) {
        const user = await User.findOneByEmail<T>(email);
        if (!user) {
            throw new ApiError({ success: false, statusCode: 404, title: "The login was not successful.", message: "The email address & password combination you have entered is incorrect. Please try again or click the forgotten password link below to reset your password." });
        }
        return user;
    },
    async verifyEmailAndPassword<T>(email: string) {
        return await User.findOneByEmail<T>(email);
    },

    async verifyPassword(user: authUser, password: string) {
        if (!verifyPassword(password, user.hash, user.salt)) {
            throw new ApiError({ success: false, statusCode: 404, title: "The login was not successful.", message: "The email address & password combination you have entered is incorrect. Please try again or click the forgotten password link below to reset your password." });
        }
    }
    

    // async ifEmailAndUsernameIsTaken(email: string): Promise<boolean> {
    //     try {
    //         // Attempt to find a user with the provided email
    //         const user = await User.fi
    //         // If a user is found, reject the promise with a custom error message
    //         if (user) {
    //             throw new ApiError(404, 'Validation Error', "User with this email already exists");
    //         }
    //         // If no user is found, fulfill the promise with a value of true
    //         return true;
    //     } catch (error: any) {
    //         throw new ApiError(404, error.message ?? 'An error occurred');

    //     }
    // },
    ,
    async findOrFailUser(email: string) {
        try {
            // // Attempt to find a user with the provided email
            // const user = await User.findOne({ email });

            // if (!user) {
            //     throw new ApiError(404, 'ValidationError', '!!No user found with the provided credentials.');
            // }

            return null;

        } catch (error: any) {
            // throw new ApiError(404, error.message);
        }
    },

    // async performLogin(user: any, password: string) {
    //     try {
    //         if (!verifyPassword(password, user.hash, user.salt)) {
    //             // throw new ApiError(404, 'CredentialsError', 'Incorrect password provided.');
    //         }

    //         // Issue JWT token for user authentication
    //         const token = utils.issueJWT(user);
    //         // Return a sanitized user object without sensitive information
    //         // const sanitizedUser: SanitizedUser = {


    //         //     email: user.email,
    //         //     role: user.role,
    //         //     token: token,
    //         // };

    //         // return sanitizedUser;

    //     } catch (error: any) {
    //         throw new ApiError({ success: false, statusCode: 404, title: "Authorization failed", message: `Something went wrong, User Authorization failed` });
    //         // throw new ApiError(404, error.message);
    //     }
    // },

    async forgotPassword(email: string): Promise<void> {
        try {
            // Assuming sendMail returns a Promise
            // await mailService.sendMail({ email: email });
        } catch (error: any) {
            // throw new ApiError(404, error.message);
        }
    },

    async getUserIDFromJWT(req: any): Promise<string> {
        if (req.user && req.user._id) {
            const _id = req.user._id;
            return _id.toString();
        }
        throw new ApiError({ success: false, statusCode: 404, title: "Authorization failed", message: `Something went wrong, User Authorization failed` });
    },

};

export default authService;
