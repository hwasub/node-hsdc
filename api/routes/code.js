const express = require('express')
const router = express.Router()
const DeckHandler = require('../app/DeckHandler')
const ApiError = require('../error/ApiError')
const bodyParser = require('body-parser')

const currentBodyParser = bodyParser.urlencoded({ extended: true })

router.get('/decode/', function (req, res, next) {
  if (!req.query.code) throw new ApiError.NoDeckcodeError()
  const handler = new DeckHandler()

  handler.parse(req.query.code, req.query.locale || 'ko').then((obj) => {
    res.status(200).json(obj.dump())
  }).catch((e) => next(e))
})

router.get('/plural/', function (req, res, next) {
  let codes
  if (!req.query.q) throw new ApiError.NoDeckcodeError()
  try {
    codes = JSON.parse(req.query.q)
  } catch (e) {
    throw new ApiError.NoDeckcodeError()
  }

  const handler = new DeckHandler()

  let results = []
  let errors = []
  let parsers = []

  codes.forEach(code => {
    parsers.push(handler.parse(code, 'en'))
  })

  handler.execAll(parsers).then(all => {
    all.errors.forEach(obj => {
      errors.push(obj)
    })
    all.results.forEach(obj => {
      results.push(obj.minidump())
    })
  }).then(() => {
    res.status(200).json({results, errors})
  })
})

/*
NOTE: This router is intended to supply a backward compatibility and to be reached by the user directly.
*/
router.post('/analyze', currentBodyParser, function (req, res, next) {
  let match, str
  str = req.body.deckcode
  if (!str) return res.redirect('/error/analyzer-got-no-query')
  let re = /(AAEC|AAEB){1}([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)/g

  if (str.length < 10) return res.redirect('/error/analyzer-got-short-query')

  try {
    match = str.match(re)
    match = match.reduce(function (a, b) {
      if (a.indexOf(b) < 0) a.push(b)
      return a
    }, [])
  } catch (e) {
    return res.redirect('/error/analyzer-found-no-deckcode')
  }

  if (match.length < 1) return res.redirect('/error/analyzer-found-no-deckcode')
  if (match.length === 1) {
    // there is only one match
    res.redirect('/' + match[0])
  } else {
    // there are more than one matches
    res.redirect('/plural?locale=ko&q=' + encodeURIComponent(JSON.stringify(match)))
  }
})

router.use(function (req, res, next) {
  throw new ApiError.NoEndpointError()
})

module.exports = router
