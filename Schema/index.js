const Express=require('express');
const BodyParser=require('body-parser');
const cors=require('cors'); 
const connectDB=require('./src/config/Dbconnection')
const morgan = require('morgan');
const userRouter =require('./src/routes/routes')
const adminRouter =require('./src/routes/adminRoutes');
const googleRouter = require('./src/routes/googleRoutes');
const app= Express();

(async()=>{
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json());
    app.use(cors());
    app.use(morgan('dev'));
    app.use('/api/cassandra/FormFields',userRouter)
    app.use('/api/formfields/admin', adminRouter)
    app.use('/api/formfields/google', googleRouter);
    await connectDB();
    app.listen(10008,()=>{
        console.log(`Auth API running on ${10008}`);
    })
})();
