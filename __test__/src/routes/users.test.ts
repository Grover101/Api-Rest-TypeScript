import { User } from '@models/user'
import { userInit, userTest } from '@testHelper/auth'
import {
    ResponseMessage,
    messageErrors,
    getAllUsers,
    ErrorMessage
} from '@testHelper/index'

// ! Todo con token
describe('GET /users', () => {
    // [ ] GET /users/all sin token
    test('Peticion de User sin Token', async () => {
        const response = await global.api
            .get('/api/v1/users')
            .expect('Content-Type', /application\/json/)
            .expect(403)
        const { message }: ResponseMessage = await response.body
        expect('Token is required').toEqual(message)
    })

    // [ ] GET /users/all con token
    test('Retornar todos los users', async () => {
        const response = await global.api
            .get('/api/v1/users')
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect('Content-Type', /application\/json/)
            .expect(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    // [ ] GET /users/all incluede username
    test('El usuario con username "Tester" se encuentra', async () => {
        const response = await global.api
            .get('/api/v1/users')
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect('Content-Type', /application\/json/)
            .expect(200)
        const usernames = response.body.map((user: User) => user.username)
        expect(usernames).toContain(userInit[0].username)
    })
})

describe('GET /users/:id', () => {
    // [ ] GET /users/:id sin token
    test('Peticion de User sin Token', async () => {
        const responseUsers = await global.api
            .get('/api/v1/users/')
            .auth(global.token?.token || '', { type: 'bearer' })
        const users: User = await responseUsers.body[0]

        const response = await global.api
            .get(`/api/v1/users/${users._id}`)
            .expect('Content-Type', /application\/json/)
            .expect(403)
        const { message }: ResponseMessage = await response.body
        expect('Token is required').toEqual(message)
    })

    // [ ] GET /users/:id con token
    test('Retornar todos los users', async () => {
        const responseUsers = await global.api
            .get('/api/v1/users/')
            .auth(global.token?.token || '', { type: 'bearer' })
        const user: User = await responseUsers.body[0]

        const response = await global.api
            .get(`/api/v1/users/${user._id}`)
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect('Content-Type', /application\/json/)
            .expect(200)
        expect(response.body.username).toEqual(user.username)
    })

    // [ ] GET /users/:id no encontrado
    test('Usuario no encontrado', async () => {
        const response = await global.api
            .get('/api/v1/users/6408e7c632af07fb2e554d2a')
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect('Content-Type', /application\/json/)
            .expect(404)
        expect(response.body.message).toBe('Not Found User')
    })
})

// [ ] POST /users
describe('POST /users', () => {
    // [ ] Create User sin token
    test('Fallo al crear un Usuario sin token (Error)', async () => {
        const response = await global.api
            .post('/api/v1/users')
            .send(userTest)
            .expect(403)
            .expect('Content-Type', /application\/json/)
        const { message }: ResponseMessage = await response.body
        expect('Token is required').toEqual(message)
    })

    // [ ] Create User con token
    test('Creacion de un Usuario', async () => {
        await global.api
            .post('/api/v1/users')
            .send(userTest)
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const { users } = await getAllUsers(api, global.token?.token || '')

        expect(users).toContain(userTest.username)
    })

    // [ ] Error User Repetido
    test('Error al crear un Usuario repetida', async () => {
        await global.api
            .post('/api/v1/users')
            .send(userTest)
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const { users } = await getAllUsers(api, global.token?.token || '')

        expect(users).toContain(userTest.username)
    })

    // [ ] Falta campo
    test('Falta de campos en la creacion', async () => {
        const newFilm = {}

        const response = await global.api
            .post('/api/v1/users')
            .send(newFilm)
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toEqual(messageErrors)
    })
})

// [ ] PUT /users/:id
describe('PUT /users/:id', () => {
    test('Fallo al actualizar un Usuario sin token (Error)', async () => {
        const response = await global.api
            .put('/api/v1/users/6408e7c632af07fb2e554d2a')
            .send(userTest)
            .expect(403)
            .expect('Content-Type', /application\/json/)
        const { message }: ResponseMessage = await response.body
        expect('Token is required').toEqual(message)
    })

    test('Fallo al actualizar, Usuario no encontrado (Error)', async () => {
        const response = await global.api
            .put('/api/v1/users/6408e7c632af07fb2e554d2a')
            .auth(global.token?.token || '', { type: 'bearer' })
            .send(userTest)
            .expect(404)
            .expect('Content-Type', /application\/json/)
        const { message }: ResponseMessage = await response.body
        expect('Not Found User').toEqual(message)
    })

    test('Update Usuario con id, uso de token', async () => {
        const responseUsers = await global.api
            .get('/api/v1/users')
            .auth(global.token?.token || '', { type: 'bearer' })
        const user: User = responseUsers.body.pop()

        const updateUser = {
            username: user.username + '2'
        }

        await global.api
            .put(`/api/v1/users/${user._id}`)
            .send(updateUser)
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const { users } = await getAllUsers(api, global.token?.token || '')
        expect(users).toContain(updateUser.username)
    })

    test('Id invalido', async () => {
        const response = await global.api
            .put('/api/v1/users/we')
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(
            response.body.map((error: ErrorMessage) => error.error)
        ).toContain('Invalid id')
    })
})

// [ ] DELETE /users/:id
describe('DELETE /users', () => {
    test('Fallo al eliminar un Usuario sin token (Error)', async () => {
        const response = await global.api
            .put('/api/v1/users/6408e7c632af07fb2e554d2a')
            .send(userTest)
            .expect(403)
            .expect('Content-Type', /application\/json/)
        const { message }: ResponseMessage = await response.body
        expect('Token is required').toEqual(message)
    })

    test('Eliminacion de un Usuario', async () => {
        const responseUsers = await global.api
            .get('/api/v1/users')
            .auth(global.token?.token || '', { type: 'bearer' })
        const user: User = responseUsers.body.pop()

        await global.api
            .delete(`/api/v1/users/${user._id}`)
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const { users } = await getAllUsers(api, global.token?.token || '')
        expect(users).not.toContain(user.username)
    })

    test('Id invalido', async () => {
        const response = await global.api
            .delete('/api/v1/users/we')
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect(400)

        expect(
            response.body.map((error: ErrorMessage) => error.error)
        ).toContain('Invalid id')
    })

    test('Id no existe', async () => {
        const response = await global.api
            .delete('/api/v1/users/6408e7c632af07fb2e554d2a')
            .auth(global.token?.token || '', { type: 'bearer' })
            .expect(404)

        expect(response.body.message).toContain('Not found User')
    })
})

// [ ] POST /users/uploadprofilephoto
