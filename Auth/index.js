const Express=require('express');
const BodyParser=require('body-parser');
const cors=require('cors'); 
const morgan = require('morgan');
const connectDB=require('./src/config/DBconnection');
const authRouter=require('./src/routes/routes');

const app= Express();



(async()=>{
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json());
    app.use(cors());
    app.use(morgan('dev'));
    await connectDB();
    
    app.use('/api/auth',authRouter)
    //api/auth/validEmai
    
    
    app.listen(10001,()=>{
        console.log(`Auth API running on ${10001}`);
    })
})();
