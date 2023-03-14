import request from 'supertest'

import app from '@app'

describe('Test app.ts', () => {
    test('Base route', async () => {
        const res = await request(app).get('/')
        expect(res.body).toEqual({ message: 'Welcome API Mini Twitter.' })
    })
})
