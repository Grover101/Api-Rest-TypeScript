import { getModelForClass, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Types } from 'mongoose'

export class Tweet extends TimeStamps {
    _id!: Types.ObjectId

    id!: string

    @prop({ type: String, required: true })
    message: string
}

const TweetModel = getModelForClass(Tweet)
export default TweetModel
