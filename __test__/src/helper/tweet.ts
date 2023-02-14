import TweetModel, { type Tweet } from '@models/tweet'
import supertest from 'supertest'

export const tweetInit: Tweet[] = [
    new TweetModel({
        message: 'Prueba para los test'
    }),
    new TweetModel({
        message: 'Este es el tweet 2 de prueba'
    }),
    new TweetModel({
        message: 'oh!!!, genial esto funciona'
    })
]

export const getAllMessageFromTweets = async (
    api: supertest.SuperTest<supertest.Test>
) => {
    const response = await api.get('/api/v1/tweets')
    return {
        messages: response.body.map((tweet: Tweet) => tweet.message),
        response
    }
}
