import test from 'ava'
import request from 'supertest'
import { createApp } from '../utils/api-express-mock'
import ApiError from '../../api/error/ApiError'
import DeckhandlerError from '../../api/error/DeckHandlerError'

test('canonical code, standard', async t => {
  t.plan(5)

  const res = await request(createApp())
    .get('/decode/')
    .query({locale: 'en', code: 'AAECAaIHBIbCAoDTAs/hAsPqAg3EAZwC7QKfA4gFmwWGCZfBAvzBAsfTAtvjAvbsAuL4AgA='})
    .send()

  t.is(res.status, 200)
  t.is(res.body.code, 'AAECAaIHBIbCAoDTAs/hAsPqAg3EAZwC7QKfA4gFmwWGCZfBAvzBAsfTAtvjAvbsAuL4AgA=')
  t.is(res.body.hero.className, 'rogue')
  t.is(res.body.dust, 8200)
  t.is(res.body.cards.length, 17)
})

test('canonical code, wild', async t => {
  t.plan(5)

  const res = await request(createApp())
    .get('/decode/')
    .query({locale: 'en', code: 'AAEBAQcIqgb5DMPqApruApL4Ap74Ao77AqCAAwtLogT/B/4Ngq0C/rwCyucC4vgCg/sCnvsCs/wCAA=='})
    .send()

  t.is(res.status, 200)
  t.is(res.body.code, 'AAEBAQcIqgb5DMPqApruApL4Ap74Ao77AqCAAwtLogT/B/4Ngq0C/rwCyucC4vgCg/sCnvsCs/wCAA==')
  t.is(res.body.hero.className, 'warrior')
  t.is(res.body.dust, 12760)
  t.is(res.body.cards.length, 19)
})

test('invalid code', async t => {
  t.plan(2)

  const res = await request(createApp())
    .get('/decode/')
    .query({locale: 'en', code: 'AAECAf0ECLQE7QW/wQKrBHHDAe72fa'})
    .send()

  t.falsy(res.body.cards)
  t.throws(DeckhandlerError.ParseError)
})

test('no code', async t => {
  t.plan(2)

  const res = await request(createApp())
    .get('/decode/')
    .send()

  t.falsy(res.body.cards)
  t.throws(ApiError.NoDeckcodeError)
})

test('unsupported locale', async t => {
  const res = await request(createApp()) // eslint-disable-line no-unused-vars
    .get('/decode/')
    .query({locale: 'qq', code: 'AAECAf0ECLQE7QW/wQKrBHHDAe72AqLTAguVA7n/AsHBApYFmMQC5gT77AKP0wLsBZX/ArsCAA=='})
    .send()

  t.throws(DeckhandlerError.UnsupportedLocaleError)
})
