const moongoose= require('mongoose');
const env = require('dotenv');

moongoose.set('strictQuery', true);

const DB = process.env.DB;

const connectDB= async()=>{
    const mongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000, 
      };
    try{
     const con=await moongoose.connect(DB)
     console.log(`connected to the MongoDB Database ${con.connection.name}`);
    }
    catch(err){
     console.log(err)
     process.exit(1);
    }
}
module.exports=connectDB;