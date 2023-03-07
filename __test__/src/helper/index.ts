import UserModel from '@models/user'
import { login, userInit } from './auth'
import supertest from 'supertest'

export interface ResponseMessage {
    message: string
}

interface AuthUser {
    token: string
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

export const authUser = async (api: supertest.SuperTest<supertest.Test>) => {
    const response = await api.post('/api/v1/auth/signIn').send(login)
    const body: AuthUser = response.body
    return body.message
}
