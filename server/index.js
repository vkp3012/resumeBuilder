import express from "express";
import mongoose from "mongoose"
import http from "http"
import cors from "cors"
import cookieParser from "cookie-parser"
mongoose.set('strictQuery',true)
import "dotenv/config"

// create a host file
const app = express();
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended : false}))

// create a port 
const port = process.env.PORT || 3000
const server = http.createServer(app);

// connect a mongoDB
mongoose.connect(process.env.MONGODB_URL)
        .then(()=>{
            console.log("MongoDB Connected")
            server.listen(port, () => {
                console.log(`Server is listening on port ${port}`);
            });
        })
        .catch((err)=>{
            console.log({err})
            process.exit(1)
        })
