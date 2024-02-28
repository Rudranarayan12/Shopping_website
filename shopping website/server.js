import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoute.js"
import cors from 'cors'
import path from 'path'
import {fileURLToPath} from 'url'
dotenv.config();
//database
connectDB();
// esmodule fix
const __filename= fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const app=express();
// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "./client/build")))

// routes
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/category",categoryRoute);
app.use("/api/v1/product",productRoute)

app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

//PORT
const PORT= process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Server is Strated On ${PORT} & Mode is ${process.env.DEV_MODE}`);
});