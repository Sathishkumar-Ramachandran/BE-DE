const Express=require('express');
const BodyParser=require('body-parser');
const cors=require('cors'); 
const connectDB=require('./src/config/Dbconnection')
const morgan = require('morgan');
const userRouter =require('./src/routes/routes')
const adminRouter =require('./src/routes/adminRoutes');
const roleRouter = require('./src/routes/roleRoutes.js');
// const googleRouter = require('./src/routes/googleRoutes');
const app= Express();

(async()=>{
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json());
    app.use(cors());
    app.use(morgan('dev'));
    app.use('/api/cassandra/FormFields',userRouter)
    app.use('/api/formfields/admin/users', adminRouter)
    app.use('/api/formfields/admin/users', roleRouter); 
    // app.use('/api/formfields/google', googleRouter);
    await connectDB();
    app.listen(10009,()=>{
        console.log(`Auth API running on ${10009}`);
    })
})();
