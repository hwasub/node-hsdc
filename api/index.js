const express = require('express')
var AppError = require('./error')
const app = express()

// Require API routes
const code = require('./routes/code')

// Import API Routes
app.use(code)

// 404 error
app.use(function (req, res, next) {
  throw new AppError.NotFoundError()
})

// error handler
app.use(function (err, req, res, next) {
  var ret = {}
  ret['status'] = 'error'
  // ret['code'] = err.code;
  ret['name'] = err.name
  ret['message'] = err.message
  console.error(err.stack)
  res.status(err.code).json(ret)
})

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
