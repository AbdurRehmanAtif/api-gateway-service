
import passport = require('passport')
import { Request, Response, NextFunction } from 'express';
// const UserController: any = require('../controllers/userController');
import UserController from '../controllers/profile/ProfileController';


export default function ProfileRoutes(router: any) {


    router.post('/api/v1/profile',
        passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await UserController.saveProfile(req, res, next)
            } catch (error) {
                next(error)
            }
        }
    )


    router.get('/api/v1/profile',
        passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await UserController.getProfile(req, res, next)
            } catch (error) {
                console.log(error)
                next(error)
            }
        }
    )



    router.post('/api/v1/address',
        passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response, next: NextFunction) => {
            await UserController.saveAddress(req, res, next)
        }
    )

    router.get('/api/v1/userDetails',
        passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response, next: NextFunction) => {
            await UserController.getProfileDetails(req, res, next)
        }
    )
    return router;
};