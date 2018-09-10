const express = require('express')
const app = express()

// Require API routes
const code = require('./routes/code')

// Import API Routes
app.use(code)

// error handler
app.use(function (err, req, res, next) {
  let ret = {}
  ret['status'] = 'error'
  ret['name'] = err.name
  ret['message'] = err.message
  if (err.deckCode) ret['code'] = err.deckCode
  res.status(err.code).json(ret)
})

app.disable('x-powered-by')

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}

// for debugger
module.exports.debugInterface = app
