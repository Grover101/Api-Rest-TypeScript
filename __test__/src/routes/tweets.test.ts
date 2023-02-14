import request from 'supertest'

import app from '@app'
import { connect, close } from '@config/mongo'
import TweetModel from '@models/tweet'
import { tweetInit } from '../helper/tweet'

const api = request(app)

beforeAll(async () => {
    jest.setTimeout(60000)
    await connect()
    await TweetModel.deleteMany({})
    for (const tweet of tweetInit) await TweetModel.create(tweet)
})

afterAll(async () => {
    await close()
})

// ! Todo con token
describe('GET all /tweets', () => {
    // [ ] /tweets/all
    test('Retornar todos los tweets', async () => {
        const response = await api
            .get('/api/v1/tweets')
            .expect('Content-Type', /application\/json/)
            .expect(200)
        expect(response.body).toHaveLength(tweetInit.length)
    })
    // [ ] GET /tweets/:id
})

// [ ] PUT /tweets/:id
// [ ] DELETE /tweets/:id
// [ ] POST /tweets/create
// [ ] POST /tweets/like/:id
