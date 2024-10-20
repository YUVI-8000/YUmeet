import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express from "express";
import { createServer } from "node:http";

import { connectToSocket } from './controllers/socketManager.js';

import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/usersRoute.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
// app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb",extended: true}));

app.use(cors({
  origin: '*', // or '*' for all origins
}));

app.use("/api/v1/users", userRoutes);
// app.use("/api/v2/users", newUserRoutes);

app.get("/",(req,res)=>{
    res.send("root is working");
})
const dbUrl = process.env.MONGO_URL

const start = async () => {
    const connectionDb = await mongoose.connect(dbUrl);
    console.log("connected to database")
    server.listen(app.get("port"),()=>{
        console.log("listening at port 8000");
    });
}
start();