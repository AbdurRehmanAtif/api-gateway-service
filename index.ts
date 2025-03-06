// Import modules using ES module syntax
import http from './src/config/http';
import dotenv from "dotenv"
import express, { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

import ApiGateway from './src/proxy';


dotenv.config()

// Start the Http Server
const app = http.expressInit()


const router = http.startRouting()

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
// restream parsed body before proxying
var restream = function (proxyReq: any, req: Request, res: Response, options: any) {
    if (req.body) {
        let bodyData = JSON.stringify(req.body);
        // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        // stream the content
        proxyReq.write(bodyData);
    }
}
app.use(restream)
ApiGateway.init(app)

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
http.expressStart(app, port)
app.use(router)


