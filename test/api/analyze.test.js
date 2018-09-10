import test from 'ava'
import request from 'supertest'
import { createApp } from '../utils/api-express-mock'

test('Parse-n-Redirect length >= 2', async t => {
  t.plan(1)

  const res = await request(createApp())
    .post('/analyze').type('form')
    .send({deckcode: 'deckasdfhSomething like AAECAaIHBIbCAoDTAs/hAsPqAg3EAZwC7QKfA4gFmwWGCZfBAvzBAsfTAtvjAvbsAuL4AgA= and A' +
        'AECAf0ECLQE7QW/wQKrBHHDAe72fa asdfa "AAECAf0ECLQE7QW/wQKrBHHDAe72AqLTAguVA7n/AsHBApYFmMQC5gT77AKP0wLsBZX/ArsCAA== a'})

  t.is(res.header.location, '/plural?locale=ko&q=%5B%22AAECAaIHBIbCAoDTAs%2FhAsPqAg3EAZwC7QKfA4gFmwWGCZfBAvzBAsfTAtvjAvbsAuL' +
    '4AgA%3D%22%2C%22AAECAf0ECLQE7QW%2FwQKrBHHDAe72%22%2C%22AAECAf0ECLQE7QW%2FwQKrBHHDAe72AqLTAguVA7n%2FAsHBApYFmMQC5gT77AKP' +
    '0wLsBZX%2FArsCAA%3D%3D%22%5D')
})

test('Parse-n-Redirect length = 1', async t => {
  t.plan(1)

  const res = await request(createApp())
    .post('/analyze').type('form')
    .send({deckcode: 'deckasdfhSomething like AAECAaIHBIbCAoDTAs/hAsPqAg3EAZwC7QKfA4gFmwWGCZfBAvzBAsfTAtvjAvbsAuL4AgA= and A'})

  t.is(res.header.location, '/AAECAaIHBIbCAoDTAs/hAsPqAg3EAZwC7QKfA4gFmwWGCZfBAvzBAsfTAtvjAvbsAuL4AgA=')
})

test('handle cannot-find', async t => {
  t.plan(1)

  const res = await request(createApp())
    .post('/analyze').type('form')
    .send({deckcode: 'dSomething nothing asdhfkajsvnkadjfnvaklsrngiwrmajfoisfmadlsifjalsdifasdfasdfasdbd'})

  t.is(res.header.location, '/error/analyzer-found-no-deckcode')
})

test('handle no-query', async t => {
  t.plan(1)

  const res = await request(createApp())
    .post('/analyze').type('form')
    .send()

  t.is(res.header.location, '/error/analyzer-got-no-query')
})
