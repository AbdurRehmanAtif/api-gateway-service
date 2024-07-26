import passport from 'passport';
import MongoStore = require('connect-mongo');
import Session = require('express-session');
import path = require('path')
import PassportJWT = require('passport-jwt')
import PassportLocal = require('passport-local')
import { User } from "../../model/user";
import CryptographicService from "./CryptographicService";
import { Express } from 'express-serve-static-core';
import ApiError from '../../utils/apiError';
import { authUser } from '../../controllers/auth/authControllers';


export default class CPassport extends CryptographicService {

    private jwtStrategy;
    private localStrategy;
    private extractJwt;
    private options;
    private app;

    constructor(app: Express) {

        super()
        this.app = app;

        app.use(passport.initialize())
        app.use(passport.session())


        this.jwtStrategy = PassportJWT.Strategy;
        this.localStrategy = PassportLocal.Strategy;

        this.extractJwt = PassportJWT.ExtractJwt;
        this.options = {
            jwtFromRequest: this.extractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.PublicKey(),
            algorithums: ['RS256'],
        }

        this.setupSessionStore()
        this.seralize()
    }

    initPassportLocal() {

        return passport.use(new this.localStrategy(
            { usernameField: 'email' }, // Specify 'email' as the field for authentication
            function (email, password, done) {
                User.findOneByEmail<authUser>(email)
                    .then((user) => {
                        if (user) {
                            return done(null, user);
                        } else {
                            const foo = new ApiError({ success: false, statusCode: 404, title: "Credentials Error", message: "No user found with the following credentials" })
                            return done(foo);
                        }
                    })
                    .catch(err => {
                        const foo = new ApiError({ success: false, statusCode: 404, title: "Credentials Error", message: "No user found with the following credentials" })
                        return done(foo);
                    });
            }
        ));
    }

    // once you initalize its a middleware, it works automatically
    //Call it at each of the route you wanna use and it will extract user from JWT token
    initPassportJWT() {
        passport.use(new this.jwtStrategy(this.options, function (payload, done) {
            console.log(payload);
            User.findOneByID(payload.sub)
                .then((user) => {
                    if (user) {
                        // Include both _id and email in the request
                        const userDetails = {
                            _id: user._id,
                            email: user.email
                        };
                        return done(null, userDetails);
                    } else {
                        const foo = new ApiError({ success: false, statusCode: 404, title: "Credentials Error", message: "No user found with the following credentials" });
                        return done(null, foo);
                    }
                })
                .catch(err => {
                    const foo = new ApiError({ success: false, statusCode: 404, title: "Credentials Error", message: "No user found with the following credentials" });
                    return done(err, false, foo);
                });
        }));
    }


    private setupSessionStore() {
        const url = process.env.MONGO_DB_URL;
        const mongoConnection = new MongoStore({ mongoUrl: url, collectionName: "session" })
        const session = Session({
            name: 'uuid_secret_client',
            secret: 'asdflasdklajlskd',
            resave: false,
            saveUninitialized: true,
            store: mongoConnection,
            cookie: { maxAge: 1000 * 60 * 60 * 24 }
        })
        this.app.use(
            session
        );
    }

    seralize() {

        passport.serializeUser((user: any, done) => {
            const userid = user?._id || null;
            done(null, userid);
        });


        passport.deserializeUser((userId, done) => {
            User.findById(userId)
                .then((user) => {
                    const seralize = {
                        _id: user?._id
                    }
                    done(null, seralize);
                })
                .catch((err) => done(err));
        });

    }
}