const Express = require('express');
const BodyParser = require('body-parser');
const cors = require('cors'); 
const morgan = require('morgan');
const app = Express();
require('dotenv').config();

const PORT = process.env.PORT || 10002;

// Internal imports
const companyRouterV1 = require('./src/routes/v1/routes').default; // Assuming v1 of the API
//const companyRouterV2 = require('./src/routes/v2/routes'); // Assuming v2 of the API
const DBconnection = require('./src/config/DBconnection');

(async () => {
    await DBconnection();
    app.use(morgan('dev'));
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json());
    app.use(cors());
    
    app.use('/api/v1/company', companyRouterV1);
    //app.use('/api/company',companyRouter)
    app.listen(PORT,()=>{
        console.log(`Company API running on ${PORT}`);
    })
}
)();
