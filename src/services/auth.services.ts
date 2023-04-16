import 'dotenv/config'
import AuthModel, { Auth } from '@models/auth'
import UserModel, { User } from '@models/user'
import { generateToken } from '@utils/jwt.handle'

const signIn = async (
    email: string,
    password: string
): Promise<Auth | null> => {
    const user = await UserModel.findByCredentials(email, password)
    if (!user) return null

    const token = await generateToken(user.username, user.email, user.role)

    const auth = new AuthModel({
        token: token,
        expire: new Date(),
        user
    })
    return auth
}

const signUp = async (): Promise<User[]> => {
    const user = await UserModel.find({})
    return user
}

const logout = async (idUser: string) => {
    return true
}

export { signIn, signUp, logout }
