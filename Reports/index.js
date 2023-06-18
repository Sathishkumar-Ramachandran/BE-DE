const express = require('express');
const app = express();
const cors = require('cors');
const BodyParser = require('body-parser');

// CORS Middleware


( async () => {
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json());
    const port = process.env.PORT || '3005';
    app.use(cors({
        origin: '*', // Allow to server to accept request from different domain than the one it is hosted
        on,
        PreflightContinue: (req, res) => {
            console.log("Accessing a preflight");
            res.sendStatus(204);
        },
        optionsSuccessStatus: 201,
        credentials : true
    }));
    
    app.use(morgan('dev'));

})