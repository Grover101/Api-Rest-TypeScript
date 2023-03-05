import UserModel from '@models/user'
import { userInit } from './auth'

export interface ResponseMessage {
    message: string
}

export const usersInit = async () => {
    await UserModel.deleteMany({})
    for (const item of userInit) {
        const user = new UserModel(item)
        await user.encryptPassword(user.password)
        await user.save()
    }
}
