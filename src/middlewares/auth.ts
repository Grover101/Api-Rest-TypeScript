import { RequestExt } from '@interfaces/request'
import AuthModel from '@models/auth'
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
        const tokenUser = verifyToken(token)
        console.log(tokenUser)

        const user = await AuthModel.findOne({
            where: {
                token: token
            }
        }).populate('user')

        console.log(user)

        next()
    } catch (error) {
        return res.status(403).send(error)
    }
}

export { validateToken }
