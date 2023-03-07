import AuthModel, { Auth } from '@models/auth'
import UserModel, { type User } from '@models/user'

export const userInit = [
    {
        username: 'Tester',
        email: 'test@gmail.com',
        password: '12345678'
    },
    {
        username: 'prueba',
        email: 'prueba@gmail.com',
        password: '12345678'
    },
    {
        username: 'prueba1',
        email: 'prueba1@gmail.com',
        password: '12345678'
    }
]

export const login = {
    email: ' test@gmail.com',
    password: '12345678'
}

export const TOKEN = async (): Promise<Auth | null> => {
    const user: User | null = await UserModel.findOne({ email: login.email })
    // ! temp
    await AuthModel.create({
        token: '234567890',
        expire: new Date(),
        user: user?.id
    })
    return await AuthModel.findOne({ user: user?.id }).populate('user')
}
