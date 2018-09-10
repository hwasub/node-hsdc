import test from 'ava'
import request from 'supertest'
import { createApp } from '../utils/api-express-mock'
import ApiError from '../../api/error/ApiError'

test('ignore error', async t => {
  t.plan(2)

  const res = await request(createApp())
    .get('/plural/')
    .query({
      locale: 'en',
      q: '["AAECAaIHBIbCAoDTAs/hAsPqAg3EAZwC7QKfA4gFmwWGCZfBAvzBAsfTAtvjAvbsAuL4AgA=","AAECAf0' +
        'ECLQE7QW/wQKrBHHDAe72fa","AAECAf0ECLQE7QW/wQKrBHHDAe72AqLTAguVA7n/AsHBApYFmMQC5gT77AKP0wLsBZX/ArsCAA=="]'})
    .send()

  t.is(res.body.results.length, 2)
  t.is(res.body.errors.length, 1)
})

test('intentional error', async t => {
  const res = await request(createApp()) // eslint-disable-line no-unused-vars
    .get('/plural/')
    .query({
      locale: 'en',
      q: '[]'})
    .send()

  t.throws(ApiError.NoDeckcodeError)
})
