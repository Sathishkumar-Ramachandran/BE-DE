const moongoose= require('mongoose');

moongoose.set('strictQuery', true);


const connectDB= async()=>{
    const mongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000, 
      };
    try{
     const con=await moongoose.connect("mongodb://127.0.0.1:27017/Engine")
     console.log(`connected to the MongoDB Database ${con.connection.name}`);
    }
    catch(err){
     console.log(err)
     process.exit(1);
    }
}
module.exports=connectDB;