import mongoose from "mongoose";

const DatabaseConnection=async (username,password)=>{
    const URL=`mongodb+srv://${username}:${password}@blog-application.hclt1.mongodb.net/`;
    try{
        await mongoose.connect(URL);
        console.log("Database connected successfully")
    }
    catch(error){
        console.log("Error connection database: ",error);
    }
}

export default DatabaseConnection;