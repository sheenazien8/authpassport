const passport = require('passport')
const jwt = require('jsonwebtoken')

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
      req.logIn(user, info, function (err) {
        if (err) {
          response.status = 500
          response.message = err

          return res.status(response.status).json(response)
        }
        const payload = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
        const token = jwt.sign(payload, process.env.JWT_SCREET)
        response.status = info.status
        response.success = true
        response.message = info.message
        response.token = token

        return res.status(response.status).json(response)
      })
    })(req, res, next)
  }
}
