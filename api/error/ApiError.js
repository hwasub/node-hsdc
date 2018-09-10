'use strict'

const AppError = require('.')

class ApiError extends AppError {
  constructor (message) {
    super(message)
    this.code = 500
  }
}

module.exports = ApiError

class NoDeckcodeError extends ApiError {
  constructor (message) {
    super(message)
    this.message = message || 'You have not requested any deckcode.'
    this.code = 400
  }
}

module.exports.NoDeckcodeError = NoDeckcodeError

class NoEndpointError extends ApiError {
  constructor (message) {
    super(message)
    this.message = message || 'An endpoint you have requested is not existent.'
    this.code = 404
  }
}

module.exports.NoEndpointError = NoEndpointError
