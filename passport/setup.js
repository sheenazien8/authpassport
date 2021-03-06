const bcrypt = require('bcrypt')
const User = require('./../models/index').User
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findOne({
    where: {
      id: id
    }
  })
    .then((user) => {
      done(false, user)
    })
    .catch((err) => {
      done(err, false)
    })
})

passport.use(
  new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    User.findOne({
      where: {
        email: email
      }
    })
      .then((user) => {
        if (!user) {
          return done(null, false, {
            message: "User Not Found",
            status: 404
          })
        }
        if (user) {
          const plainPassword = password
          const hash = user.password
          bcrypt.compare(plainPassword, hash, (err, match) => {
            if (err) throw err;

            if (match) {
              return done(null, user, {message: 'YAY!! youre now logged in', status: 200});
            } else {
              return done(null, false, {
                message: "Wrong Password",
                status: 401
              })
            }
          })
        }
      })
      .catch((err) => {
        return done(null, false, {message: err})
      })
  })
)

module.exports = passport
