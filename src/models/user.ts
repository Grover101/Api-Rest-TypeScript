import {
    DocumentType,
    ReturnModelType,
    getModelForClass,
    prop
} from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import bcrypt from 'bcryptjs'
import { Types } from 'mongoose'

export class User extends TimeStamps {
    _id!: Types.ObjectId

    id!: string

    @prop({ type: String, default: '' })
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

    public async encryptPassword(this: DocumentType<User>, password: string) {
        this.password = await bcrypt.hash(password, 10)
    }

    public static async findByCredentials(
        this: ReturnModelType<typeof User>,
        email: string,
        password: string
    ) {
        const user = await this.findOne({ email }).exec()
        if (!user) return null
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) return null
        return user
    }
}

const UserModel = getModelForClass(User)
export default UserModel
