import mongoose from "mongoose"
export const connectionDb = async()=>{
    try{
        const mongoUri = process.env.MONGO_URI
        if(!mongoUri){
            throw new Error("mongo uri is not avilable in your env file.")
        }
        const connection = await mongoose.connect(mongoUri);
        console.log("mongodb connection sucessfull", connection.connection.host)
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}