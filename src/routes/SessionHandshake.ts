import { Request, Response, NextFunction } from 'express';
import passport from 'passport';


export default function SessionHandshake(router: any) {

    router.post('/session/handshake', passport.authenticate('local'), async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("user", req.user)
            console.log("authorization", req.headers["authorization"])
            console.log("session", req.headers["session"])
        } catch (error) {

            console.log(error)
            next(error);
        }
    });

    router.get('/session/verify', passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                console.log("user", req.user)
                console.log("authorization", req.headers["authorization"])
                console.log("session", req.headers["session"])
            } catch (error) {

                console.log(error)
                next(error);
            }

        });
    return router;

}
// module.exports = function (app: any) {

//     // TODO
//     router.post('/login', passport.authenticate('local',
//         {
//             failureRedirect: '/login-failure',
//             successRedirect: '/login-success'
//         }),);

//     // TODO
//     router.post('/register', (req, res, next) => {

//         const saltHash = genPassword(req.body.password);

//         const salt = saltHash.salt;
//         const hash = saltHash.hash;

//         const newUser = new User({
//             username: req.body.username,
//             hash: hash,
//             salt: salt,
//             admin: true
//         })
//         newUser.save().then((user) => {
//         })
//         res.redirect('/login')
//     });

//     return router;
// };