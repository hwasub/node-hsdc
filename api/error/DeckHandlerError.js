'use strict'

var AppError = require('.')

class DeckhandlerError extends AppError {
  constructor (message) {
    super(message)
    this.code = 500
  }
}

module.exports = DeckhandlerError

class DecodeError extends DeckhandlerError {
  constructor (message) {
    super(message)
    this.message = message || 'Error occured in the decoding process. A deckcode you have requested may be illformed.'
    this.code = 416
  }
}

module.exports.DecodeError = DecodeError

class ParseError extends DeckhandlerError {
  constructor (message) {
    super(message)
    this.message = message || 'Error occured in the parsing process. A deckcode you have requested may be illformed.'
    this.code = 416
  }
}

module.exports.ParseError = ParseError

class UnsupportedLocaleError extends DeckhandlerError {
  constructor (message) {
    super(message)
    this.message = message || 'You have requested a non-supported locale.'
    this.code = 417
  }
}

module.exports.UnsupportedLocaleError = UnsupportedLocaleError

class InternalError extends DeckhandlerError {
  constructor (message) {
    super(message)
    this.message = message || 'Internal Server Error'
    this.code = 500
  }
}

module.exports.InternalError = InternalError
