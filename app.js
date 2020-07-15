const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
require('dotenv').config()

//For BodyParser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// For Passport
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', function (req, res) {
    res.send('Welcome to Passport with Sequelize')
});


app.listen(5000, function (err) {
    if (!err)
        console.log("Site is live in port 5000")
    else console.log(err)
});
