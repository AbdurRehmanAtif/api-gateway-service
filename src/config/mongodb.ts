import mongoose from 'mongoose';
import dotenv = require('dotenv')


dotenv.config();


function connectMongo(app: any, URL: string) {

    mongoose.connect(URL).then(() => {
        console.log("App is connected to MONGO DB")
    }).catch((error) => {
        console.log("App is not connected to MONGO DB, Make sure that the IP is whitelisted")
        console.log(error)
    })
}


export default { connectMongo }