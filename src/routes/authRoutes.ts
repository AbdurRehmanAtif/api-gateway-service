import { Request, Response, NextFunction } from 'express';
import authController from '../controllers/auth/authControllers';
import passport from 'passport';
import ApiError from '../utils/apiError';


export default function AuthRoutes(router: any) {

    router.post('/api/v1/login',
        passport.authenticate('local'), async (req: Request, res: Response, next: NextFunction) => {
            try {
                await authController.login(req, res, next);
            } catch (error) {
                const foo = new ApiError({ success: false, statusCode: 404, title: "Credentials Error", message: "No user found with the following credentials" })
                next(foo);
            }
        });
    // router.get('/api/v1/loginError', (req: Request, res: Response) => {
    //     try {
    //         return res.status(404).json({ success: false, statusCode: 404, title: "Credentials Error", message: "No user found with the following credentials" });
    //     } catch (error) {
    //         // Handle the error
    //         console.log("yay walala error chal raha a")
    //         return res.status(404).json({ success: false, statusCode: 404, title: "Credentials Error", message: "No user found with the following credentials" });
    //     }
    // });



    router.post('/api/v1/register', async (req: Request, res: Response, next: NextFunction) => {
        try {
            await authController.register(req, res, next);
        } catch (error) {
            next(error);
        }
    });

    router.post('/api/v1/forgotPassword', async (req: Request, res: Response, next: NextFunction) => {
        try {
            await authController.forgotPassword(req, res, next);
        } catch (error) {
            next(error);
        }
    });

    return router;
}



