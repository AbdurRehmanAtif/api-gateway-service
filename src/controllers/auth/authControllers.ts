import authService from '../../services/AuthService';
import apiResponse from '../../utils/apiResponse';
import validation from '../../utils/validation';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../../utils/apiError';
import { issueJWT } from "../../utils/password";
import ProfileService from '../../services/ProfileService';
import { Mongoose } from 'mongoose';

interface SanitizedUser {
    email: string
    token?: { token: string; expires: string; }
    session?: string;
    role?: [string];
}
export interface authUser {
    _id: any
    email: string
    hash: string
    salt: string
    role?: [string];
}
const authController = {

    // Asynchronous function for user registration
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            // Destructure email, and password from the request body
            const { email, password } = req.body;
            // Validate the request body using the basicValidation method
            await validation.basicValidation(req.body);
            // Check if the provided username and email are already taken
            await authService.emailNotAlreadyTaken<authUser>(email)
            // Create a new user with the provided username, email, and password
            const newUser = await authService.registerUserWithPassword({ email, password });
            //create token
            const token = issueJWT(newUser);
            // Manipulate or sanitize the user data as needed
            // Set the Authorization header with the JWT token
            res.setHeader('Authorization', `Bearer ${token}`);

            // Set a custom header for the session ID
            res.setHeader('Secret-Session-Id', req.session.id);

            const sanitizedUser: SanitizedUser = {
                email: newUser.email,
                role: newUser.role,
            };
            // Use sanitizedUser as needed (e.g., return it as part of the response)
            return res.status(200).json(new apiResponse(200, 'User Registeration', 'User registered successfully', sanitizedUser));
        } catch (error) {
            // If an error occurs, pass it to the next middleware for handling
            next(error);
        }
    },

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            // Destructure username, email, and password from the request body
            const { email, password } = req.body;
            // Validate the request body using the basicValidation method
            await validation.basicValidation(req.body);
            // Validate the request and see first if the user exist
            const user = await authService.verifyEmail<authUser>(email)
            await authService.verifyPassword(user, password)
            // Manipulate or sanitize the user data as needed
            const token = issueJWT(user);
            // Set the Authorization header with the JWT token
            res.setHeader('authorization', JSON.stringify(token));
            // Set a custom header for the session ID
            res.setHeader('session_id', req.session.id);

            const sanitizedUser: SanitizedUser = {
                email: user.email,
                role: user.role,
            };
            return res.status(200).json(new apiResponse(200, '','User login successfully', sanitizedUser));

        } catch (error) {
            next(error)
        }
    },

    async forgotPassword(req: Request, res: Response, next: NextFunction) {

        // Destructure username, email, and password from the request body
        const { email } = req.body;
        // Validate the request body using the basicValidation method
        await validation.basicValidation(req.body);
        // Perform forgot password
        const result = await authService.forgotPassword(email);
        return res.status(200).json(new apiResponse(200,'', `An email has been sent to ${email} with instructions for resetting your password.`, result));

    },

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        console.log(req)

    },

};

export default authController