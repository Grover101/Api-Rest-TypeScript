import TweetModel, { type Tweet } from '@models/tweet'

const insertTweet = async (tweet: Tweet): Promise<Tweet> => {
    const response = await TweetModel.create(tweet)
    return response
}

const getTweets = async (): Promise<Tweet[]> => {
    const response = await TweetModel.find({})
    return response
}

const getTweetId = async (id: string): Promise<Tweet | null> => {
    const response = await TweetModel.findById(id).lean()
    return response
}

const updateTweet = async (id: string, data: Tweet): Promise<Tweet | null> => {
    const response = await TweetModel.findOneAndUpdate({ _id: id }, data, {
        new: true
    })
    return response
}

const deleteTweet = async (id: string): Promise<boolean> => {
    const response = await TweetModel.deleteOne({ _id: id })
    return !(response.deletedCount === 0)
}

export { insertTweet, getTweets, getTweetId, updateTweet, deleteTweet }
