import mongoose from 'mongoose';
import dotenv = require('dotenv')
dotenv.config();

export default class MongoDBProvider {


    
    constructor() {
        mongoose.connect(process.env.MONGO_DB_URL || "")
            .then(() => {
                console.log("App is connected to MongoDB");
            })
            .catch((error) => {
                console.error("App failed to connect to MongoDB:", error);
        });
    }
}