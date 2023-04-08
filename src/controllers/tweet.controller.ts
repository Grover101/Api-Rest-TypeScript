import {
    deleteTweet,
    getTweetId,
    getTweets,
    insertTweet,
    updateTweet
} from '@services/tweet.services'
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
            return tweet
                ? res.status(200).json(tweet)
                : res.status(404).json({ message: 'Not Found Tweet' })
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    },
    async create({ body }: Request, res: Response) {
        try {
            const tweet = await insertTweet(body)
            return res.status(201).json(tweet)
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
    async update({ body, params }: Request, res: Response) {
        try {
            const tweet = await updateTweet(params.id, body)
            return tweet
                ? res.status(200).json(tweet)
                : res.status(404).json({ message: 'Not Found Tweet' })
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    },
    async delete({ params }: Request, res: Response) {
        try {
            const tweet = await deleteTweet(params.id)
            return tweet
                ? res.status(200).json({ message: 'Tweet deleted' })
                : res.status(404).json({
                      message: 'Not found Tweet'
                  })
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    }
}
