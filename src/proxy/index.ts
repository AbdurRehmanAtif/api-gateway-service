import expressHttpProxy from 'express-http-proxy';
import { Express } from 'express';
import { services } from './services';

export default class ApiGateway {
    static init(app: Express) {
        // Set up proxy middleware for each microservice
        services.forEach(({ route, target }) => {
            // Define proxy options
            const proxyOptions = {
                // Set the target for the proxy
                proxyReqPathResolver: (req) => {
                    // Rewrite the path based on the route
                    return `${target}${req.originalUrl.replace(new RegExp(`^${route}`), '')}`;
                },
                timeout: 10000, // Set timeout to 10000 milliseconds (10 seconds)
                userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
                    // Optionally modify the response before sending it back
                    return proxyResData;
                },
                // Handle errors
                onError: (err, req, res) => {
                    console.error(`Proxy error: ${err.message}`);
                    console.error(`Request details: ${req.method} ${req.url}`);
                    res.status(500).send('Proxy error');
                },
            };

            // Use the proxy middleware with the defined options
            app.use(route, expressHttpProxy(target, proxyOptions));
        });
    }
}
