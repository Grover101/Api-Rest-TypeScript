import { login } from '@testHelper/auth'

describe('POST /auth/signIn', () => {
    // [x] POST /auth/signIn
    test('Retornar token si es correcto el acceso', async () => {
        const response = await global.api
            .post('/api/v1/auth/signIn')
            .send(login)
            .expect('Content-Type', /application\/json/)
            .expect(200)
        expect(response.body.message).toBe('Login Successful')
        expect(response.body.token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/)
    })

    // [x] Email or Password Incorrect
    test('Email or Password incorrect', async () => {
        const response = await global.api
            .post('/api/v1/auth/signIn')
            .send({ email: 'a@a.com', password: '1' })
            .expect('Content-Type', /application\/json/)
            .expect(403)
        expect(response.body.message).toBe(
            'Incorrect Data, Email o Password incorrect'
        )
    })

    // [ ] Eamil invalidated
    test('Email invalidated', async () => {
        const response = await global.api
            .post('/api/v1/auth/signIn')
            .send({ email: 'a', password: '1' })
            .expect('Content-Type', /application\/json/)
            .expect(400)
        expect(response.body.message).toBe('Email Invalidated')
    })

    // [ ] Password invalidated
    test('Password invalidated', async () => {
        const response = await global.api
            .post('/api/v1/auth/signIn')
            .send({ email: 'a@a.com', password: '1' })
            .expect('Content-Type', /application\/json/)
            .expect(400)
        expect(response.body.message).toBe('Password Invalidated')
    })
})

// [ ] POST /auth/signUp
describe('POST /auth/signUp', () => {
    // [ ] POST /auth/signIn
    test('Retornar token si es correcto el acceso', async () => {
        const response = await global.api
            .post('/api/v1/auth/signUp')
            .send({
                email: 'newTest@gmail.com',
                password: '12345678',
                username: 'New Test'
            })
            .expect('Content-Type', /application\/json/)
            .expect(200)
        expect(response.body.message).toEqual('Successful Registration')
    })

    // [ ] Email invalidated
    test('Email invalidated', async () => {
        const response = await global.api
            .post('/api/v1/auth/signIn')
            .send({ email: 'a', password: '1' })
            .expect('Content-Type', /application\/json/)
            .expect(400)
        expect(response.body.message).toBe('Email Invalidated')
    })

    // [ ] Username Exists
    test('Username exists', async () => {
        const response = await global.api
            .post('/api/v1/auth/signIn')
            .send({
                email: '12newTest@gmail.com',
                password: '12345678',
                username: 'New Test'
            })
            .expect('Content-Type', /application\/json/)
            .expect(400)
        expect(response.body.message).toBe('Username Exists')
    })

    // [ ] Email Exists
    test('Email exists', async () => {
        const response = await global.api
            .post('/api/v1/auth/signIn')
            .send({
                email: 'newTest@gmail.com',
                password: '12345678',
                username: 'New Test 2'
            })
            .expect('Content-Type', /application\/json/)
            .expect(400)
        expect(response.body.message).toBe('Email Exists')
    })

    // [ ] Password invalidated
    test('Password invalidated', async () => {
        const response = await global.api
            .post('/api/v1/auth/signIn')
            .send({ email: 'a@a.com', password: '1' })
            .expect('Content-Type', /application\/json/)
            .expect(400)
        expect(response.body.message).toBe('Password Invalidated')
    })
})

// [ ] GET /auth/active/{username}/{code}
// [ ] POST /auth/forgot
// [ ] POST /auth/resetpassword
// ? requiere Token
// [ ] POST /auth/changepassword
