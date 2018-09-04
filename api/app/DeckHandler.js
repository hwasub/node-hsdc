'use strict'

const fs = require('fs')
const path = require('path')
const Promise = require('promise')
const util = require('util')
const deckstring = require('deckstrings')
const DeckhandlerError = require('../error/DeckHandlerError')

var deckhandler = function () {
  var db

  this.isInitialized = function () {
    if (db) return true
    return false
  }

  this.initialize = function (locale) {
    let cardFile = path.join(__dirname, '..', 'assets', 'cards.%s.json')
    if (['en', 'ko'].indexOf(locale) === -1)
    {
      throw new DeckhandlerError.UnsupportedLocaleError()
    }
    let fn = util.format(cardFile, locale)
    if (fs.existsSync(fn)) {
      let data = fs.readFileSync(fn, 'utf8')
      db = JSON.parse(data)
    } else {
      throw new DeckhandlerError.InternalError()
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
            let data = this.parseDataWorker(deckArr)
            data.locale = locale
            resolve(data)
          } catch (e) {
            reject(new DeckhandlerError.ParseError())
          }
        } catch (e) {
          reject(e)
        }
      } catch (e) {
        reject(new DeckhandlerError.DecodeError())
      }
    })
  }

  this.getResponseObject = function () {
    return {
      'format': 0,
      'locale': '',
      'hero': [],
      'cards': [],
      'dust': 0,

      'getFormat': function () {
        if (this.format == 1) return 'Wild'
        if (this.format == 2) return 'Standard'
        return 'Unknown'
      },

      'getHero': function () {
        let tmp = this.hero
        let ret = {}

        ret.class = tmp[0].cardClass.toLowerCase()
        ret.name = tmp[0].name

        return ret
      },

      'getLocale': function () {
        return this.locale
      },

      /*
          "cards": [
        {
            "artist": "Doug Alexander",
            "cardClass": "DRUID",
            "collectible": true,
            "cost": 0,
            "dbfId": 254,
            "flavor": "Some druids still have flashbacks from strangers yelling \"Innervate me!!\" at them.",
            "howToEarn": "Unlocked at Level 1.",
            "howToEarnGolden": "Unlocked at Level 36.",
            "id": "EX1_169",
            "name": "Innervate",
            "rarity": "FREE",
            "set": "CORE",
            "text": "Gain 1 Mana Crystal this turn only.",
            "type": "SPELL",
            "count": 2
        },
      */
      'getCards': function() {
        let ret = []
        let rarity_to_dust = {
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
          item.dust = rarity_to_dust[item.rarity]
          totalDust = totalDust + (rarity_to_dust[item.rarity] * item.count)
          ret.push(item)
        })

        this.dust = totalDust

        return ret
      },

      'dump': function () {
        let cards = this.getCards()
        return {
          'status': 'ok',
          'format': this.getFormat(),
          'locale': this.getLocale(),
          'hero': this.getHero(),
          'cards': cards,
          'dust': this.dust
        }
      }
    }
  }

  this.parseDataWorker = function (deckArr) {
    let ret = this.getResponseObject()

    ret.format = deckArr.format

    deckArr.heroes.forEach(lst => {
      let heroId = lst
      let item = this.get(heroId)
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

      // id
      if (a['dbfId'] < b['dbfId']) return -1
      if (a['dbfId'] > b['dbfId']) return 1

      // count
      if (a['count'] < b['count']) return -1
      if (a['count'] > b['count']) return 1

      // can't compare
      return 0
    })

    return ret
  }

  return this
}

module.exports = deckhandler
