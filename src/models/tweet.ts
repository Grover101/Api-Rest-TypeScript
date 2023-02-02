import { type Tweet } from '@interfaces/tweet.interface'
import { model, Schema } from 'mongoose'

const TweetSchema = new Schema<Tweet>(
    {
        message: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)
const TweetModel = model<Tweet>('tweets', TweetSchema)

export default TweetModel
