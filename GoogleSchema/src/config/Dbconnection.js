const moongoose= require('mongoose');
moongoose.set('strictQuery', true);


const connectDB= async()=>{
    const mongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000, // Set connection timeout to 30 seconds
      };
    try{
     const con=await moongoose.connect("mongodb://127.0.0.1:27017/signup")
     console.log(`connected to the MongoDB Database ${con.connection.name}`);
    }
    catch(err){
     console.log(err)
     //console.log('Retrying in 10 seconds...');
   //  setTimeout(connectDB, 10000);;
     process.exit(1);
    }
}
module.exports=connectDB;