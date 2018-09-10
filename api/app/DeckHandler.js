'use strict'

const fs = require('fs')
const path = require('path')
const Promise = require('promise')
const util = require('util')
const deckstring = require('deckstrings')
const DeckhandlerError = require('../error/DeckHandlerError')

const deckhandler = function () {
  let db

  this.isInitialized = function () {
    return !!db
  }

  this.initialize = function (locale) {
    let cardFile = path.join(__dirname, '..', 'assets', 'cards.%s.json')
    if (['en', 'ko', 'ja'].indexOf(locale) === -1) {
      throw new DeckhandlerError.UnsupportedLocaleError()
    }
    let fn = util.format(cardFile, locale)
    if (fs.existsSync(fn)) {
      let data = fs.readFileSync(fn, 'utf8')
      db = JSON.parse(data)
    } else {
      throw new DeckhandlerError()
    }
  }

  this.get = function (cardId) {
    let idx = db.findIndex(entry => entry.dbfId === cardId)
    return db[idx]
  }

  this.parse = function (deckCode, locale) {
    return new Promise((resolve, reject) => {
      try {
        let deckArr = deckstring.decode(deckCode)
        try {
          if (!this.isInitialized()) this.initialize(locale)
          try {
            let data = this.parseDataWorker(deckArr, deckCode)
            data.locale = locale
            resolve(data)
          } catch (e) {
            reject(new DeckhandlerError.ParseError({deckCode}))
          }
        } catch (e) {
          reject(e)
        }
      } catch (e) {
        reject(new DeckhandlerError.ParseError({deckCode}))
      }
    })
  }

  this.getResponseObject = function () {
    return {
      'format': 0,
      'locale': '',
      'hero': [],
      'cards': [],
      'code': '',
      'dust': 0,

      'getFormat': function () {
        if (this.format === 1) return 'format.wild'
        if (this.format === 2) return 'format.standard'
        return 'format.unknown'
      },

      'getHero': function () {
        let tmp = this.hero
        let ret = {}

        ret.classID = 'heroClass.' + tmp[0].cardClass.toLowerCase()
        ret.className = tmp[0].cardClass.toLowerCase()

        return ret
      },

      'getLocale': function () {
        return this.locale
      },

      'getCode': function () {
        return this.code
      },

      'getCards': function () {
        let ret = []
        let rarityToDust = {
          'free': 0,
          'common': 40,
          'rare': 100,
          'epic': 400,
          'legendary': 1600
        }

        let totalDust = 0

        this.cards.forEach(x => {
          let item = {}
          item.id = x.id
          item.dbfId = x.dbfId
          item.cost = x.cost
          item.name = x.name
          item.class = x.cardClass.toLowerCase()
          item.rarity = x.rarity.toLowerCase()
          item.set = x.set.toLowerCase()
          item.count = x.count
          totalDust = totalDust + (rarityToDust[item.rarity] * item.count)
          ret.push(item)
        })

        this.dust = totalDust

        return ret
      },

      'dump': function () {
        let cards = this.getCards()
        return {
          'status': 'ok',
          'code': this.getCode(),
          'format': this.getFormat(),
          'locale': this.getLocale(),
          'hero': this.getHero(),
          'cards': cards,
          'dust': this.dust
        }
      },

      'minidump': function () {
        this.getCards()
        return {
          'code': this.getCode(),
          'format': this.getFormat(),
          'hero': this.getHero(),
          'dust': this.dust
        }
      }
    }
  }

  this.parseDataWorker = function (deckArr, deckCode = '') {
    let ret = this.getResponseObject()

    ret.format = deckArr.format
    if (deckCode) ret.code = deckCode

    deckArr.heroes.forEach(lst => {
      let item = this.get(lst)
      ret['hero'].push(item)
    })

    deckArr.cards.forEach(lst => {
      let cardId = lst[0]
      let cardCount = lst[1]
      let item = this.get(cardId)
      item['count'] = cardCount
      ret['cards'].push(item)
    })

    ret['cards'].sort((a, b) => {
      // cost
      if (a['cost'] < b['cost']) return -1
      if (a['cost'] > b['cost']) return 1

      // name
      if (a['name'] < b['name']) return -1
      if (a['name'] > b['name']) return 1

      // can't compare
      return 0
    })

    return ret
  }

  /* execAll adapted from bennyn/executeAllPromises
     @url: https://gist.github.com/bennyn/dd69a3132d45d82ca8e3d22875a35168 */
  this.execAll = function (promises) {
    let resolvingPromises = promises.map(function (promise) {
      return new Promise(function (resolve) {
        let payload = new Array(2)
        promise.then(function (result) {
          payload[0] = result
        })
          .catch(function (error) {
            payload[1] = error
          })
          .then(function () {
            resolve(payload)
          })
      })
    })

    let errors = []
    let results = []

    return Promise.all(resolvingPromises)
      .then(function (items) {
        items.forEach(function (payload) {
          if (payload[1]) {
            errors.push(payload[1])
          } else {
            results.push(payload[0])
          }
        })

        return {
          errors: errors,
          results: results
        }
      })
  }

  return this
}

module.exports = deckhandler
