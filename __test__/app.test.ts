describe('Test app.ts', () => {
    test('Base route', async () => {
        const res = await global.api.get('/')
        expect(res.body).toEqual({ message: 'Welcome API Mini Twitter.' })
    })
})
