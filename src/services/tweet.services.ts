import TweetModel from '@models/tweet'
import { type Tweet } from '../interfaces/tweet.interface'

const insertTweet = async (tweet: Tweet): Promise<Tweet> => {
    const response = await TweetModel.create(tweet)
    return response
}

const getTweets = async (): Promise<Tweet[]> => {
    const response = await TweetModel.find({})
    return response
}

const getTweetId = async (id: string): Promise<Tweet | null> => {
    const response = await TweetModel.findOne({ _id: id })
    return response
}

export { insertTweet, getTweets, getTweetId }
