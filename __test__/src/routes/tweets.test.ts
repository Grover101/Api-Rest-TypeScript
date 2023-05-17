import { Tweet } from '@models/tweet'
import { getAllMessageFromTweets, tweetTest } from '@testHelper/tweet'
import { ErrorMessage, ResponseMessage, messageErrors } from '@testHelper/index'

// ! Todo con token
describe('GET all /tweets', () => {
    // [ ] /tweets/all sin token
    test('Error: Retornar todos los tweets sin token', async () => {
        const response = await global.api
            .get('/api/v1/tweets')
            .expect('Content-Type', /application\/json/)
            .expect(403)
        expect('Token is required').toEqual(response.body.message)
    })

    // [ ] GET /tweets/all con token
    test('Retornar todos los Tweets', async () => {
        const response = await global.api
            .get('/api/v1/tweets')
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect('Content-Type', /application\/json/)
            .expect(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    // [ ] GET /tweets/all Tweet encontrado
    test('El tweet "Prueba para los test" se encuentra', async () => {
        const { messages } = await getAllMessageFromTweets(
            api,
            global.token?.token || ''
        )
        expect(messages).toContain('Prueba para los test')
    })
})

// [ ] GET /tweets/:id
describe('GET /tweets/:id', () => {
    // [ ] GET /tweets/:id sin token
    test('Peticion de Tweet sin Token', async () => {
        const responseTweets = await global.api
            .get('/api/v1/tweets/')
            .auth(global.token?.token || '', { type: 'bearer' })
        const tweet: Tweet = await responseTweets.body[0]

        const response = await global.api
            .get(`/api/v1/tweets/${tweet._id}`)
            .expect('Content-Type', /application\/json/)
            .expect(403)
        const { message }: ResponseMessage = await response.body
        expect('Token is required').toEqual(message)
    })

    // [ ] GET /tweets/:id con token
    test('Retornar todos los Tweets', async () => {
        const responseTweets = await global.api
            .get('/api/v1/tweets/')
            .auth(global.token?.token || '', { type: 'bearer' })
        const tweet: Tweet = await responseTweets.body[0]

        const response = await global.api
            .get(`/api/v1/tweets/${tweet._id}`)
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect('Content-Type', /application\/json/)
            .expect(200)
        // console.log(response.body)

        expect(response.body.message).toEqual(tweet.message)
    })

    // [ ] GET /tweets/:id no encontrado
    test('Tweet no encontrado', async () => {
        const response = await global.api
            .get('/api/v1/tweets/6408e7c632af07fb2e554d2a')
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect('Content-Type', /application\/json/)
            .expect(404)

        // console.log(response.body)

        expect(response.body.message).toBe('Not Found Tweet')
    })
})

// [ ] POST /tweets
describe('POST /tweets', () => {
    // [ ] Create User sin token
    test('Fallo al crear un Tweet sin token (Error)', async () => {
        const response = await global.api
            .post('/api/v1/tweets')
            .send(tweetTest)
            .expect(403)
            .expect('Content-Type', /application\/json/)
        const { message }: ResponseMessage = await response.body
        expect('Token is required').toEqual(message)
    })

    // [ ] Create User con token
    test('Creacion de un Usuario', async () => {
        await global.api
            .post('/api/v1/tweets')
            .send(tweetTest)
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const { messages } = await getAllMessageFromTweets(
            api,
            global.token?.token || ''
        )

        expect(messages).toContain(tweetTest.message)
    })

    // [ ] Falta campo
    test('Falta de campos en la creacion', async () => {
        const response = await global.api
            .post('/api/v1/tweets')
            .send({})
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toEqual(messageErrors)
    })
})

// [ ] PUT /tweets/:id
describe('PUT /tweets/:id', () => {
    test('Fallo al actualizar un Tweet sin token (Error)', async () => {
        const response = await global.api
            .put('/api/v1/tweets/6408e7c632af07fb2e554d2a')
            .send(tweetTest)
            .expect(403)
            .expect('Content-Type', /application\/json/)
        const { message }: ResponseMessage = await response.body
        expect('Token is required').toEqual(message)
    })

    test('Fallo al actualizar, Tweet no encontrado (Error)', async () => {
        const response = await global.api
            .put('/api/v1/tweets/6408e7c632af07fb2e554d2a')
            .send(tweetTest)
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect(404)
            .expect('Content-Type', /application\/json/)
        const { message }: ResponseMessage = await response.body
        expect('Not Found Tweet').toEqual(message)
    })

    test('Update Tweet con id, uso de token', async () => {
        const responseTweets = await global.api
            .get('/api/v1/tweets')
            .auth(global.token?.token || '', { type: 'bearer' })
        const tweet: Tweet = responseTweets.body.pop()

        const updateTweet = {
            message: tweet.message + '2'
        }

        await global.api
            .put(`/api/v1/tweets/${tweet._id}`)
            .send(updateTweet)
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const { messages } = await getAllMessageFromTweets(
            api,
            global.token?.token || ''
        )
        expect(messages).toContain(updateTweet.message)
    })

    test('Id invalido', async () => {
        const response = await global.api
            .put('/api/v1/tweets/we')
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(
            response.body.map((error: ErrorMessage) => error.error)
        ).toContain('Invalid id')
    })
})

// [ ] DELETE /tweets/:id
describe('DELETE /tweets/:id', () => {
    test('Fallo al eliminar un Tweet sin token (Error)', async () => {
        const response = await global.api
            .delete('/api/v1/tweets/6408e7c632af07fb2e554d2a')
            .expect(403)
            .expect('Content-Type', /application\/json/)
        const { message }: ResponseMessage = await response.body
        expect('Token is required').toEqual(message)
    })

    test('Eliminacion de un Tweet', async () => {
        const responseUsers = await global.api
            .get('/api/v1/tweets')
            .auth(global.token?.token || '', { type: 'bearer' })
        const tweet: Tweet = responseUsers.body.pop()

        await global.api
            .delete(`/api/v1/tweets/${tweet._id}`)
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const { messages } = await getAllMessageFromTweets(
            api,
            global.token?.token || ''
        )
        expect(messages).not.toContain(tweet.message)
    })

    test('Id invalido', async () => {
        const response = await global.api
            .delete('/api/v1/tweets/we')
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect(400)

        expect(
            response.body.map((error: ErrorMessage) => error.error)
        ).toContain('Invalid id')
    })

    test('Id no existe', async () => {
        const response = await global.api
            .delete('/api/v1/tweets/6408e7c632af07fb2e554d2a')
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect(404)

        expect(response.body.message).toContain('Not found Tweet')
    })
})

// [ ] POST /tweets/like/:id
