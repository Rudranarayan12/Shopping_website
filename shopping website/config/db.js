import mongoose from "mongoose";
const connectDB = async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connect To MongoDB ${conn.connection.host}`);
    }
    catch(error){
        console.log(`Error in Mongo DB ${error}`);
    }
}
export default connectDB;