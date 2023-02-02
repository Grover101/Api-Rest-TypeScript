import { getModelForClass, prop } from '@typegoose/typegoose'

class User {
    @prop({ type: String, required: true })
    name: string

    @prop({ type: String, unique: true, required: true, trim: true })
    username: string

    @prop({ type: String, unique: true, required: true, trim: true })
    email: string

    @prop({ type: String })
    description: string

    @prop({ type: String })
    website: string

    @prop({ type: String })
    role: string

    @prop({ type: String })
    photoUrl: string

    @prop({ type: String, required: true, minlength: 8 })
    password: string
}

const UserModel = getModelForClass(User)
export default UserModel
