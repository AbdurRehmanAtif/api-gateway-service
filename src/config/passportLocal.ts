import passport = require('passport')

import { Strategy as localStrategy } from 'passport-local';

// import User from '../src/model/user.modal.js';
import { verifyPassword } from '../utils/password.js';


const verifyCallBack = async (username: string, password: string, done: any) => {

    try {
        // const user = await User.findOne({ username: username });
        // const passwordVerify: boolean = user?.hash && user?.salt ? verifyPassword(password, user.hash, user.salt) : false;
        // if (!passwordVerify) { return done(null, false); }
        // return done(null, user);

    } catch (error) {
        return done(null, "User not found from login section");
    }

}

const strategy = new localStrategy(verifyCallBack);
passport.use(strategy);
// user._id
passport.serializeUser((user: any, done) => {

    const userid = user?._id || null;
    done(null, userid);
});


passport.deserializeUser((userId, done) => {

    // User.findById(userId)
    //     .then((user) => {
    //         done(null, user);
    //     })
    //     .catch((err) => done(err));
});
