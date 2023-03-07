import request from 'supertest'

import app from '@app'
import { connect, close } from '@config/mongo'
import TweetModel from '@models/tweet'
import { getAllMessageFromTweets, tweetInit } from '../helper/tweet'
import { TOKEN } from '../helper/auth'
import AuthModel, { Auth } from '@models/auth'
import { authUser } from '../helper'

const api = request(app)
let token: Auth | null

beforeAll(async () => {
    jest.setTimeout(60000)
    await connect()
    await TweetModel.deleteMany({})
    for (const tweet of tweetInit) await TweetModel.create(tweet)
    await authUser(api)
    await AuthModel.deleteMany({})
    token = await TOKEN()
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
            .auth(token?.token || '', { type: 'bearer' })
            .expect('Content-Type', /application\/json/)
            .expect(200)
        expect(response.body).toHaveLength(tweetInit.length)
    })

    test('El tweet "Prueba para los test" se encuentra', async () => {
        const { messages } = await getAllMessageFromTweets(api)
        expect(messages).toContain('Prueba para los test')
    })
    // [ ] GET /tweets/:id
})

// [ ] PUT /tweets/:id
// [ ] DELETE /tweets/:id
// [ ] POST /tweets/create
// [ ] POST /tweets/like/:id
