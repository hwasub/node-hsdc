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
