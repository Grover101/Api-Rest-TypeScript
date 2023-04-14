import authController from '@controllers/auth.controller'
import { Router } from 'express'

const router = Router()

router.post('/signIn', authController.login)
router.post('/signUp', authController.register)

export { router }
