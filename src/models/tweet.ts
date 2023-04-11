import { Ref, getModelForClass, mongoose, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Types } from 'mongoose'
import { User } from '@models/user'

export class Tweet extends TimeStamps {
    _id!: Types.ObjectId

    id!: string

    @prop({ type: String, required: true })
    message: string

    @prop({ ref: () => User, required: true })
    public user: Ref<User>

    @prop({ ref: () => User })
    public likes?: mongoose.Types.Array<Ref<User | null>>
}

const TweetModel = getModelForClass(Tweet)
export default TweetModel
