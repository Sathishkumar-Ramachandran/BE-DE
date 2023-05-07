const Express=require('express');
const BodyParser=require('body-parser');
const cors=require('cors'); 
const morgan = require('morgan');
const ROUTES=require('./routes/Routes');
const setupProxies=require('./routes/Proxy');

const app= Express();



app.use(cors());
app.use(morgan('dev'));
setupProxies(app, ROUTES);

app.listen(10000,()=>{
    console.log("API gateway running on 10000");
})