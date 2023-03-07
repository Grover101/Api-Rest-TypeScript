import { Ref, getModelForClass, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Types } from 'mongoose'
import { User } from '@models/user'

export class Auth extends TimeStamps {
    _id!: Types.ObjectId

    id!: string

    @prop({ type: String, required: true })
    token: string

    @prop({ type: Date, default: Date.now })
    expire: Date

    @prop({ ref: () => User })
    public user: Ref<User>
}

const AuthModel = getModelForClass(Auth)
export default AuthModel
