import { getTweetId, getTweets, insertTweet } from '@services/tweet.services'
import { handleHttp } from '@utils/error.handle'
import { type Request, type Response } from 'express'

export default {
    async index(_req: Request, res: Response) {
        try {
            const tweets = await getTweets()
            return res.status(200).json(tweets)
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    },
    async show({ params }: Request, res: Response) {
        try {
            const tweet = await getTweetId(params.id)
            return res.status(200).json(tweet)
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    },
    async create({ body }: Request, res: Response) {
        try {
            const tweet = await insertTweet(body)
            return res.status(200).json(tweet)
        } catch (error) {
            handleHttp(res, 'Error in the request', error)
        }
    },
    createLike(_req: Request, res: Response) {
        try {
            const option = 'hola'
            return res.status(200).json({ all: option })
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    },
    update(_req: Request, res: Response) {
        try {
            const option = 'hola'
            return res.status(200).json({ all: option })
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    },
    delete(_req: Request, res: Response) {
        try {
            const option = 'hola'
            return res.status(200).json({ all: option })
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    }
}
