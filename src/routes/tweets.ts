import tweetController from '@controllers/tweet.controller'
import { Router } from 'express'

const router = Router()

router.get('/', tweetController.index)
router.get('/:id', tweetController.show)
router.post('/', tweetController.create)
router.post('/like/:id', tweetController.createLike)
router.put('/:id', tweetController.update)
router.delete('/:id', tweetController.delete)

export { router }
