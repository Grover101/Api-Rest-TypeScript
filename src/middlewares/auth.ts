import { RequestExt } from '@interfaces/request'
import { TokenUser } from '@interfaces/tokenUser'
import AuthModel from '@models/auth'
import UserModel from '@models/user'
import { verifyToken } from '@utils/jwt.handle'
import { NextFunction, Response } from 'express'

const validateToken = async (
    req: RequestExt,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.headers.authorization) {
            return res.status(403).send({ message: 'Token is required' })
        }

        const token = req.headers.authorization.split(' ')[1]
        const verify = verifyToken(token)

        const tokenUser = verify as TokenUser

        const auth = await AuthModel.findOne({ token })
        if (!auth) return res.status(403).send({ message: 'Invalidate Token' })

        const user = await UserModel.findOne({
            email: tokenUser.email,
            username: tokenUser.username
        })

        req.user = user?.id

        next()
    } catch (error) {
        return res.status(403).send(error)
    }
}

export { validateToken }
