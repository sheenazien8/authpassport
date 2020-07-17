const express = require('express')
const app = express()
const passport = require('./passport/setup')
const session = require('express-session')
const bodyParser = require('body-parser')
const router = require('./routes')
const cors = require('cors')
require('dotenv').config()

app.use(cors())
//For BodyParser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// For Passport
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', function (req, res) {
  res.json({
    success: true,
    date: new Date()
  })
});

router.init(app)

app.listen(5000, function (err) {
  if (!err)
    console.log("Site is live in port 5000")
  else console.log(err)
});

module.exports = app
