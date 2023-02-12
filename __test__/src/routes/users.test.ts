import request from 'supertest'

import app from '@app'
import { connect, close } from '@config/mongo'

const api = request(app)

beforeAll(async () => {
    jest.setTimeout(60000)
    await connect()
})

afterAll(async () => {
    await close()
})

describe('GET /users', () => {
    test('Retornar todos los users', async () => {
        const response = await api
            .get('/api/v1/users')
            .expect('Content-Type', /application\/json/)
            .expect(200)
        expect(Array.isArray(response.body)).toBe(true)
    })
})
