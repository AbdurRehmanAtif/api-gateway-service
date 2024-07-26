import express = require("express")
import cors = require("cors")

function expressInit() {
    // create express connection
    const app = express();
    // let the api use json requests
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // Configure CORS middleware
    app.use(cors({
        origin: '*', // Allow requests from this origin
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization', 'SecretSessionId', 'cache-control'], // Allow these headers
    }));

    // Middleware to set CORS headers
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, SecretSessionId');
        next();
    });

    return app;
}


function expressStart(app: any, PORT: number) {
    // start the app on specific PORT
    app.listen(PORT, () => {
        console.log(`App is listening to  ${process.env.PORT}`);
    })

}

function startRouting() {
    const router = express.Router();
    router.get('/', (req, res, next) => {
   
        res.send('proxy Server working fine ` 5010');
    });
    return router;
}

export default {
    expressInit,
    expressStart,
    startRouting
};


