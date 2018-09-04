'use strict'

class AppError extends Error {
  constructor (message, code) {
    super(message)
    this.message = message || 'Something went wrong. Please try again later.'
    this.code = code || 500
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError

class NotFoundError extends AppError {
  constructor (message) {
    super(message)
    this.message = message || 'Not Found'
    this.code = 404
  }
}

module.exports.NotFoundError = NotFoundError
