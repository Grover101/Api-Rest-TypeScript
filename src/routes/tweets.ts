import { Router } from 'express'
import tweetController from '@controllers/tweet.controller'
import { validateToken } from '@middlewares/auth'

const router = Router()

router.get('/', validateToken, tweetController.index)
router.get('/:id', validateToken, tweetController.show)
router.post('/', validateToken, tweetController.create)
router.post('/like/:id', validateToken, tweetController.createLike)
router.put('/:id', validateToken, tweetController.update)
router.delete('/:id', validateToken, tweetController.delete)

export { router }
