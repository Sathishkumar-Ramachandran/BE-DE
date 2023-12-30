const Express = require('express');
const BodyParser = require('body-parser');
const cors = require('cors'); 
const morgan = require('morgan');
const app = Express();
require('dotenv').config();

const PORT = process.env.PORT || 10007;

// Internal imports
const companyRouterV1 = require('./src/routes/v1/routes'); // Assuming v1 of the API
//const companyRouterV2 = require('./src/routes/v2/routes'); // Assuming v2 of the API
const DBconnection = require('./src/config/DBconnection');

(async () => {
    await DBconnection();
    app.use(morgan('dev'));
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json());
    app.use(cors());
<<<<<<< HEAD
    
    app.use('/api/v1/company', companyRouter);
    //app.use('/api/company',companyRouter)
    app.listen(10005,()=>{
        console.log(`Company API running on ${10005}`);
    })
}
)();
=======

    // API Versioning
    app.use('/api/v1/company', companyRouterV1);
    //app.use('/api/v2/company', companyRouterV2);

    app.listen(PORT, () => {
        console.log(`Company API running on ${PORT}`);
    });
})();
>>>>>>> 19e950baa42b5eae7da53ef1cffec91ee422df13
