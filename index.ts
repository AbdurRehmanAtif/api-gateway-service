// Import modules using ES module syntax
import http from './src/config/http';
import AuthRoute from './src/routes/authRoutes';
import SessionHandshake from './src/routes/SessionHandshake';
import session from './src/config/sessions';
import ProfileRoute from './src/routes/profileRoutes';
import dotenv from "dotenv"
import "./src/config/passportLocal";
import express, { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { DatabaseProviderFactory, DatabaseType } from './src/factory/databaseProviderFactory';
import CPassport from './src/lib/security/Passport';
import ApiGateway from './src/proxy';
import graphQlInit from './src/config/graphQl';

dotenv.config()

// Start the Http Server
const app = http.expressInit()
const router = http.startRouting()

graphQlInit()

ApiGateway.init(app)

const dbFactory = new DatabaseProviderFactory()
const databaseType = [DatabaseType.MongoDB]
dbFactory.createDatabaseProviders(databaseType)


// //setting session 
session.setupSessionStore(app)
// //Use  Passport Auth
// //use JWT Passport
const cPassport = new CPassport(app)
cPassport.initPassportJWT()
cPassport.initPassportLocal()
//Session Routes
app.use('', SessionHandshake(router))
// // //Basic JWT routes
app.use('', AuthRoute(router))
// // //User Profile Routes
app.use('', ProfileRoute(router))

const errorHandler: ErrorRequestHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode || 500).json({
        statusCode: error.statusCode || 500,
        success: false,
        message: error.message || 'Internal Server Error',
        error: error.errorLog || 'An error occurred',
        stackTrace: error.errors || null,
    })
    next()
}

app.use(errorHandler)


const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
http.expressStart(app, port)
// mongodb.setupSessionStore(app);


