import userController from '@controllers/user.controller'
import { Router } from 'express'

const router = Router()

router.get('/', userController.index)
router.get('/:id', userController.show)
router.post('/', userController.create)
router.put('/:id', userController.update)
router.delete('/:id', userController.delete)

export { router }
