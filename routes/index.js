const express = require('express')
const app = express()
const router = express.Router()


const init = (server) => {
  server.get('/server', (req, res) => {
    res.json({
      server: 'ok'
    })
  })
}

module.exports = {init}
