import { User } from '@models/user'
import { signIn, signUp } from '@services/auth.services'
import { handleHttp } from '@utils/error.handle'
import { type Request, type Response } from 'express'

export default {
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const auth = await signIn(email, password)
            const user: User | null = auth?.user as User

            return auth
                ? res.status(200).json({
                      message: 'Login Successful',
                      token: auth?.token,
                      username: user?.username,
                      email: user?.email
                  })
                : res.status(403).json({
                      message: 'Incorrect Data, Email o Password incorrect'
                  })
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    },
    async register({ body }: Request, res: Response) {
        try {
            const { username, email, password } = body

            const user = await signUp(username, email, password)
            return user
                ? res.status(200).json({
                      message: 'Successful Registration',
                      username: user?.username,
                      email: user?.email
                  })
                : res.status(400).json({
                      message: 'Incorrect Data, Email o Password incorrect'
                  })
        } catch (error) {
            handleHttp(res, 'Error in the request', error)
        }
    }
}
