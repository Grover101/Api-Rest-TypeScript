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

    const token = generateToken(user.username, user.email, user.role, {
        expiresIn: '4h'
    })

    const auth = new AuthModel({ token, expire: new Date(), user })
    return await auth.save()
}

const signUp = async (
    username: string,
    email: string,
    password: string
): Promise<User | null> => {
    const user = await UserModel.findOne({
        $or: [{ username }, { email }]
    })
    if (user) return null

    const newUser = new UserModel({ username, email, password })
    await newUser.encryptPassword(newUser.password)
    return await newUser.save()
}

const logout = async (idUser: string) => {
    return true
}

export { signIn, signUp, logout }
