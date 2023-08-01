const Express = require('express');
const BodyParser = require('body-parser');
const cors = require('cors'); 
const connectDB = require('./src/config/Dbconnection')
const morgan = require('morgan');
// const userRouter =require('./src/routes/routes')
const campaignRouter =require('./src/routes/campaignRoutes');
const rolesRouter = require('./src/routes/roleRoutes')
const userRouter = require('./src/routes/userRoutes');
//const adminuserRouter = require('./src/routes/userRoutesAdmin');
const adsRouter = require('./src/routes/AdsRoutes')
const app = Express();

(async()=>{
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json());
    app.use(cors());
    app.use(morgan('dev'));
    app.use('/api/formfields/facebook/campaigns', campaignRouter);
    app.use('/api/formfields/facebook/users/roles', rolesRouter);
    // app.use('/api/formfields/facebook/users/', userRouter);
    app.use('/api/formfields/facebook/ads', adsRouter);
    //app.use('/api/formfields/facebook/adset', adsetRouter)
    app.use('/api/facebook/mediasetup', mediasetup);
    await connectDB();
    app.listen(10002,()=>{
        console.log(`Facebook Schema API running on ${10002}`);
    })
})();
