import request from 'supertest'

import app from '@app'
import { connect, close } from '@config/mongo'
import { TOKEN, userInit } from '../helper/auth'
import { ResponseMessage, authUser, usersInit } from '../helper'
import AuthModel, { Auth } from '@models/auth'
import { User } from '@models/user'

const api = request(app)
let token: Auth | null

beforeAll(async () => {
    jest.setTimeout(60000)
    await connect()
    await usersInit()
    await authUser(api)
    await AuthModel.deleteMany({})
    token = await TOKEN()
})

afterAll(async () => {
    await close()
})

// ! Todo con token
describe('GET /users', () => {
    // [] GET /users/all sin token
    test('Peticion de User sin Token', async () => {
        const response = await api
            .get('/api/v1/users')
            .expect('Content-Type', /application\/json/)
            .expect(403)
        const { message }: ResponseMessage = await response.body
        expect('Token is required').toEqual(message)
    })

    // [] GET /users/all con token
    test('Retornar todos los users', async () => {
        const response = await api
            .get('/api/v1/users')
            .auth(token?.token || '', { type: 'bearer' })
            .expect('Content-Type', /application\/json/)
            .expect(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    // [] GET /users/all incluede username
    test('El usuario con username "Tester" se encuentra', async () => {
        const response = await api
            .get('/api/v1/users')
            .auth(token?.token || '', { type: 'bearer' })
            .expect('Content-Type', /application\/json/)
            .expect(200)
        const usernames = response.body.map((user: User) => user.username)
        expect(usernames).toContain(userInit[0].username)
    })
})

// [ ] GET /users/:id
// [ ] DELETE /users/:id
// [ ] PUT /users/profile
// [ ] POST /users/uploadprofilephoto
