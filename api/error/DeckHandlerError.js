'use strict'

const AppError = require('.')

class DeckhandlerError extends AppError {
  constructor (message) {
    super(message)
    this.code = 500
  }
}

module.exports = DeckhandlerError

class ParseError extends DeckhandlerError {
  constructor ({message = '', deckCode = ''}) {
    super(message)
    this.message = message || 'Cannot parse; input is illformed.'
    this.deckCode = deckCode || ''
    this.code = 400
  }
}

module.exports.ParseError = ParseError

class UnsupportedLocaleError extends DeckhandlerError {
  constructor ({message = '', deckCode = ''}) {
    super(message)
    this.message = message || 'You have requested a non-supported locale.'
    this.deckCode = deckCode || ''
    this.code = 400
  }
}

module.exports.UnsupportedLocaleError = UnsupportedLocaleError
