import request from 'supertest'

import app from '@app'
import { connect, close } from '@config/mongo'
import TweetModel, { type Tweet } from '@models/tweet'
import { getAllMessageFromTweets, tweetInit, tweetTest } from '../helper/tweet'
import { TOKEN } from '../helper/auth'
import AuthModel, { Auth } from '@models/auth'
import { ResponseMessage, authUser, messageErrors } from '../helper'

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
    // [ ] /tweets/all sin token
    test('Retornar todos los tweets', async () => {
        const response = await api
            .get('/api/v1/tweets')
            .expect('Content-Type', /application\/json/)
            .expect(403)
        expect(response.body).toHaveLength(tweetInit.length)
    })

    // [ ] GET /tweets/all con token
    test('Retornar todos los users', async () => {
        const response = await api
            .get('/api/v1/users')
            .auth(token?.token || '', { type: 'bearer' })
            .expect('Content-Type', /application\/json/)
            .expect(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    // [ ] GET /users/all Tweet encontrado
    test('El usuario con username "Tester" se encuentra', async () => {
        const { messages } = await getAllMessageFromTweets(
            api,
            token?.token || ''
        )
        expect(messages).toContain('Prueba para los test')
    })
})

// [ ] GET /tweets/:id
describe('GET /tweets/:id', () => {
    // [ ] GET /tweets/:id sin token
    test('Peticion de Tweet sin Token', async () => {
        const responseTweets = await api
            .get('/api/v1/tweets/')
            .auth(token?.token || '', { type: 'bearer' })
        const tweet: Tweet = await responseTweets.body[0]

        const response = await api
            .get(`/api/v1/tweets/${tweet._id}`)
            .expect('Content-Type', /application\/json/)
            .expect(403)
        const { message }: ResponseMessage = await response.body
        expect('Token is required').toEqual(message)
    })

    // [ ] GET /users/:id con token
    test('Retornar todos los Tweets', async () => {
        const responseTweets = await api
            .get('/api/v1/tweets/')
            .auth(token?.token || '', { type: 'bearer' })
        const tweet: Tweet = await responseTweets.body[0]

        const response = await api
            .get(`/api/v1/tweets/${tweet._id}`)
            .auth(token?.token || '', { type: 'bearer' })
            .expect('Content-Type', /application\/json/)
            .expect(200)
        console.log(response.body)

        expect(response.body.message).toEqual(tweet.message)
    })

    // [ ] GET /tweets/:id no encontrado
    test('Tweet no encontrado', async () => {
        const response = await api
            .get('/api/v1/tweets/6408e7c632af07fb2e554d2a')
            .auth(token?.token || '', { type: 'bearer' })
            .expect('Content-Type', /application\/json/)
            .expect(404)

        console.log(response.body)

        expect(response.body.message).toBe('Not Found Tweet')
    })
})

// [ ] POST /tweets
describe('POST /users', () => {
    // [ ] Create User sin token
    test('Fallo al crear un Tweet sin token (Error)', async () => {
        const response = await api
            .post('/api/v1/tweets')
            .send(tweetTest)
            .expect(403)
            .expect('Content-Type', /application\/json/)
        const { message }: ResponseMessage = await response.body
        expect('Token is required').toEqual(message)
    })

    // [ ] Create User con token
    test('Creacion de un Usuario', async () => {
        await api
            .post('/api/v1/tweets')
            .send(tweetTest)
            .auth(token?.token || '', { type: 'bearer' })
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const { messages } = await getAllMessageFromTweets(
            api,
            token?.token || ''
        )

        expect(messages).toContain(tweetTest.message)
    })

    // [ ] Falta campo
    test('Falta de campos en la creacion', async () => {
        const response = await api
            .post('/api/v1/tweets')
            .send({})
            .auth(token?.token || '', { type: 'bearer' })
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toEqual(messageErrors)
    })
})

// [ ] PUT /tweets/:id
// [ ] DELETE /tweets/:id
// [ ] POST /tweets/like/:id
