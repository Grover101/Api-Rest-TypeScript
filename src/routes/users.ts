import userController from '@controllers/user.controller'
import { validateToken } from '@middlewares/auth'
import { Router } from 'express'

const router = Router()

router.get('/', validateToken, userController.index)
router.get('/:id', validateToken, userController.show)
router.post('/', validateToken, userController.create)
router.put('/:id', validateToken, userController.update)
router.delete('/:id', validateToken, userController.delete)

export { router }
