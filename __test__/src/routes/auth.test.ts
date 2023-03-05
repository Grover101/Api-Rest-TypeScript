import request from 'supertest'

import app from '@app'
import { connect, close } from '@config/mongo'
import { usersInit } from '../helper'

const api = request(app)

beforeAll(async () => {
    jest.setTimeout(60000)
    await connect()
    await usersInit()
})

afterAll(async () => {
    await close()
})

// [ ] POST /auth/login
describe('POST /auth/login', () => {
    test('Retornar todos los users', async () => {
        const response = await api
            .post('/api/v1/auth/login')
            .expect('Content-Type', /application\/json/)
            .expect(200)
        expect(Array.isArray(response.body)).toBe(true)
    })
})

// [ ] POST /auth/signup
// [ ] GET /auth/active/{username}/{code}
// [ ] POST /auth/forgot
// [ ] POST /auth/resetpassword
// ? requiere Token
// [ ] POST /auth/changepassword
