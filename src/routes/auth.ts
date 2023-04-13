import { Router } from 'express'

const router = Router()

router.post('/signIn', (_res, req) =>
    req.status(200).json({ message: 'Login' })
)
router.post('/signUp', (_res, req) =>
    req.status(200).json({ message: 'Register' })
)

export { router }
