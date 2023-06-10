const Express = require('express');
const BodyParser = require('body-parser');
const cors = require('cors'); 
const connectDB = require('./src/config/Dbconnection')
const morgan = require('morgan');
// const userRouter =require('./src/routes/routes')
const campaignRouter =require('./src/routes/campaignRoutes');
const rolesRouter = require('./src/routes/roleRoutes')
const userRouter = require('./src/routes/userRoutes');
const adminuserRouter = require('./src/routes/userRoutesAdmin');
const app = Express();

(async()=>{
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json());
    app.use(cors());
    app.use(morgan('dev'));
    // app.use('/api/cassandra/FormFields',userRouter);
    // app.use('/api/formfields/admin/users', adminuserRouter);
    app.use('/api/formfields/google/campaigns', campaignRouter);
    app.use('/api/formfields/google/users/roles', rolesRouter);
    app.use('/api/formfields/google/users/', userRouter);
    
    await connectDB();
    app.listen(10008,()=>{
        console.log(`Auth API running on ${10008}`);
    })
})();
