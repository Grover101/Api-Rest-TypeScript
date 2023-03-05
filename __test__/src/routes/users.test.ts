import request from 'supertest'

import app from '@app'
import { connect, close } from '@config/mongo'
import { TOKEN } from '../helper/auth'
import { ResponseMessage, usersInit } from '../helper'

const api = request(app)

beforeAll(async () => {
    jest.setTimeout(60000)
    await connect()
    await usersInit()
})

afterAll(async () => {
    await close()
})

// ! Todo con token
// [] GET /users/all
describe('GET /users', () => {
    test('Peticion de User sin Token', async () => {
        const response = await api
            .get('/api/v1/users')
            .expect('Content-Type', /application\/json/)
            .expect(403)
        const { message }: ResponseMessage = await response.body
        expect('Token is required').toEqual(message)
    })

    test('Retornar todos los users', async () => {
        const response = await api
            .get('/api/v1/users')
            .auth(TOKEN, { type: 'bearer' })
            .expect('Content-Type', /application\/json/)
            .expect(200)

        expect(Array.isArray(response.body)).toBe(true)
    })
})

// [ ] GET /users/:id
// [ ] DELETE /users/:id
// [ ] PUT /users/profile
// [ ] POST /users/uploadprofilephoto
