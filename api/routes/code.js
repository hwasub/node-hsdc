const express = require('express')
const router = express.Router()
const DeckHandler = require('../app/DeckHandler')
const ApiError = require('../error/ApiError')

router.get('/decode/', function (req, res, next) {
  console.log(req.query)
  if (!req.query.code) throw new ApiError.NoDeckcodeError()

  const handler = new DeckHandler()

  handler.parse(req.query.code, req.query.locale || 'ko').then((obj) => {
    res.status(200).json(obj.dump())
  }).catch((e) => {
    next(e)
  })
})

router.use(function (req, res, next) {
  throw new ApiError.NoEndpointError()
})

module.exports = router
