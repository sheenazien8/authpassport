const passport = require('passport')

module.exports = {
  login: async function (req, res, next) {
    let response = {
      success: false,
      status: 500,
      message: 'Something went wrong'
    }
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        response.status = 500

        return res.status(response.status).json(response)
      }
      if (!user) {
        response.status = info.status
        response.message = info.message

        return res.status(response.status).json(response)
      }
      req.logIn(user, function (err) {
        if (err) {
          response.status = 500
          response.message = err

          return res.status(response.status).json(response)
        }
        response.status = 200
        response.success = true
        response.message = 'YAY!! youre now logged in'

        return res.status(response.status).json(response)
      })
    })(req, res, next)
  }
}
