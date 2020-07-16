const User = require('./../models/index').User
const bcrypt = require('bcrypt')

module.exports = {
  login: async function (req, res) {
    let response = {
      success: false,
      status: 500,
      message: 'Something went wrong'
    }
    let user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!user) {
      response.status = 404
      response.message = 'User not Found'
    }
    if (user) {
      const plainPassword = req.body.password
      const hash = user.password
      const checkPassword = bcrypt.compareSync(plainPassword, hash)
      if (checkPassword) {
        response.status = 200
        response.success = true
        response.message = "YAY!! You're logged in now"
      } else {
        response.status = 401
        response.success = false
        response.message = "You're not logged in"
      }
    }

    res.status(response.status).json(response)
  }
}
