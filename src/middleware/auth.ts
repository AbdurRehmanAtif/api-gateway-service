import { Request, Response, NextFunction } from 'express';
import { authUser } from '../controllers/auth/authControllers';
import { User } from '../model/user';


// export function isAuth(req: Request, res: Response, next: NextFunction) {
//     // if (req.isAuthenticated()) {
//     //     next();
//     // } else {
//     //     res.status(401).json({
//     //         mgs: 'You are not authorized to view this page'
//     //     });
//     // }
// }

// export function isAdmin(req: Request, res: Response, next: NextFunction) {
//     // Assuming req.user is of type User
//     // if (req.isAuthenticated() && (req.user as User).admin) {
//     //     next();
//     // } else {
//     //     res.status(401).json({
//     //         msg: 'You are not authorized to view this page'
//     //     });
//     // }
// }