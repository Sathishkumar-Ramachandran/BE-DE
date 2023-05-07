const Express=require('express');
const BodyParser=require('body-parser');
const cors=require('cors'); 
const DBconnection=require('./src/config/DBconnection')
const morgan = require('morgan');
const companyRouter=require('./src/routes/routes')
const app= Express();
(async ()=>{
 await DBconnection();
 app.use(morgan('dev'));
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(cors());
app.use('/api/company',companyRouter)



app.listen(10002,()=>{
    console.log(`Company API running on ${10002}`);
})


}
)();