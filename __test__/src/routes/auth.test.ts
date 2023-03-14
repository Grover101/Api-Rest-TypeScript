import request from 'supertest'

import app from '@app'
import { connect, close } from '@config/mongo'
import { usersInit } from '../helper'
import { login } from '../helper/auth'

const api = request(app)

beforeAll(async () => {
    jest.setTimeout(60000)
    await connect()
    await usersInit()
})

afterAll(async () => {
    await close()
})

describe('POST /auth/signIn', () => {
    // [ ] POST /auth/signIn
    test('Retornar token si es correcto el acceso', async () => {
        const response = await api
            .post('/api/v1/auth/signIn')
            .send(login)
            .expect('Content-Type', /application\/json/)
            .expect(200)
        expect(response.body.message).toBe('Login Successful')
    })
})

// [ ] POST /auth/signUp
describe('POST /auth/signUp', () => {
    // [ ] POST /auth/signIn
    test('Retornar token si es correcto el acceso', async () => {
        const response = await api
            .post('/api/v1/auth/signUp')
            .send({
                email: ' newTest@gmail.com',
                password: '12345678',
                username: 'New Test'
            })
            .expect('Content-Type', /application\/json/)
            .expect(200)
        expect(response.body.message).toEqual('Successful Registration')
    })
})

// [ ] GET /auth/active/{username}/{code}
// [ ] POST /auth/forgot
// [ ] POST /auth/resetpassword
// ? requiere Token
// [ ] POST /auth/changepassword
