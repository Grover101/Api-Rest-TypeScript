import { getModelForClass, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
export class Tweet extends TimeStamps {
    @prop({ type: String, required: true })
    message: string
}

const TweetModel = getModelForClass(Tweet)
export default TweetModel
