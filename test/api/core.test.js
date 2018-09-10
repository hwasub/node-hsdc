import test from 'ava'
import request from 'supertest'
import { createApp } from '../utils/api-express-mock'
import ApiError from '../../api/error/ApiError'

test('handle non-existent endpoint', async t => {
  const res = await request(createApp()) // eslint-disable-line no-unused-vars
    .get('/error-404-no-endpoint')
    .query({locale: 'en', code: 'AAECAf0ECLQE7QW/wQKrBHHDAe72fa'})
    .send()

  t.throws(ApiError.NoEndpointError)
})
