import { getModelForClass, prop } from '@typegoose/typegoose'

export class User {
    @prop({ type: String, required: true })
    name: string

    @prop({ type: String, unique: true, required: true, trim: true })
    username: string

    @prop({ type: String, unique: true, required: true, trim: true })
    email: string

    @prop({ type: String, default: '' })
    description: string

    @prop({ type: String, default: '' })
    website: string

    @prop({ type: String, default: '' })
    role: string

    @prop({ type: String, default: '' })
    photoUrl: string

    @prop({ type: String, required: true, minlength: 8 })
    password: string
}

const UserModel = getModelForClass(User)
export default UserModel
