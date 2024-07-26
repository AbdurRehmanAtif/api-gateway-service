import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo'; // Assuming you have the connect-mongo package installed

// Extend the SessionOptions interface to include the httpOnly property


function setupSessionStore(app: express.Application) {
    app.use(
        session({
            name: 'example.sid',
            secret: 'Replace with your secret key',
            resave: false,
            saveUninitialized: true,
            store: MongoStore.create({
                mongoUrl: process.env.MONGO_DB_URL,
            }),
        })
    );
}

export default {
    setupSessionStore
}