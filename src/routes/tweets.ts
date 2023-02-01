import ControllerTweet from '@controllers/ControllerTweet'
import { Router } from 'express'

const router = Router()

router.get('/', ControllerTweet.index)
router.get('/:id', ControllerTweet.show)
router.post('/', ControllerTweet.create)
router.post('/like', ControllerTweet.createLike)
router.put('/:id', ControllerTweet.update)
router.delete('/:id', ControllerTweet.delete)

export { router }
