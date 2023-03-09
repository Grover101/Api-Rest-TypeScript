import UserModel, { type User } from '@models/user'
import { login, userInit } from './auth'
import supertest from 'supertest'

export interface ResponseMessage {
    message: string
}

export interface ErrorMessage {
    error: string
    field: string
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

export const getAllUsers = async (
    api: supertest.SuperTest<supertest.Test>,
    token: string
) => {
    const response = await api
        .get('/api/v1/users')
        .auth(token, { type: 'bearer' })
    return { users: response.body.map((user: User) => user.username) }
}

export const errorUsers = [
    { field: 'username', message: 'Username is required' },
    { field: 'email', message: 'Email is required' },
    { field: 'password', message: 'password is invalid' }
]
