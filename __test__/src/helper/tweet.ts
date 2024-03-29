import { type Tweet } from '@models/tweet'
import supertest from 'supertest'

export const tweetInit = [
    { message: 'Prueba para los test' },
    { message: 'Este es el tweet 2 de prueba' },
    { message: 'oh!!!, genial esto funciona' }
]

export const tweetTest = {
    message: 'New message for test'
}

export const getAllMessageFromTweets = async (
    api: supertest.SuperTest<supertest.Test>,
    token: string
) => {
    const response = await api
        .get('/api/v1/tweets')
        .auth(token, { type: 'bearer' })
    return {
        messages: response.body.map((tweet: Tweet) => tweet.message),
        response
    }
}
