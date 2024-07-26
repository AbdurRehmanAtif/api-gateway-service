import { Request, Response, NextFunction } from 'express';

interface User {
    admin: string
}

// module.exports.isTokenVerified = (req: Request, res: Response, next: NextFunction) => {

//     console.log(req.user)



//     if (req.isAuthenticated() && (req.user as User).admin) {
//         next();
//     } else {
//         res.status(401).json({
//             mgs: 'You are not authorized to view this page'
//         })
//     }

// }