
const { createProxyMiddleware } = require('http-proxy-middleware')
import { Express } from 'express';
import { services } from './services';
import passport from 'passport';

const rateLimit = 20; // Max requests per minute
const interval = 60 * 1000; // Time window in milliseconds (1 minute)


export default class ApiGateway {

    static init(app: Express) {
        // Set up proxy middleware for each microservice
        services.forEach(({ route, target }) => {
            // Define proxy options
            const proxyOptions = {
                target,
                changeOrigin: true,
                pathRewrite: {
                    [`^${route}`]: "", // Rewrite path
                },
            };

            // Apply middleware conditionally
            if (route === '/auth') {
                // No JWT authentication for /auth route
                app.use(route, createProxyMiddleware(proxyOptions));
            } else {
                // JWT authentication for all other routes
                app.use(
                    route,
                    passport.authenticate('jwt', { session: false }),
                    createProxyMiddleware(proxyOptions)
                );
            }
        });
    }

}