import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebroute from './route/web'
import connection from './configs/connectDB';

import cookieParser from 'cookie-parser';
import sessions from 'express-session';
import bodyParser from 'body-parser';

require('dotenv').config();


const app = express()
const port = process.env.PORT || 3000;

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// cookie parser middleware
app.use(cookieParser());

// body parser
app.use(express.urlencoded({extended: true}));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(bodyParser.json());

// Expose user data to all templates
app.use(function(req, res, next) {
    res.locals.loggedIn = req.session.loggedIn;
    next();
});

// Setup view engine
configViewEngine(app);

// Init web route
initWebroute(app);

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})

