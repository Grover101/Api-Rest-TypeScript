import TweetModel, { type Tweet } from '@models/tweet'

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
