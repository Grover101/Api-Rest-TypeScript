import { RequestExt } from '@interfaces/request'
import { TokenUser } from '@interfaces/tokenUser'
import AuthModel from '@models/auth'
import UserModel from '@models/user'
import { verifyToken } from '@utils/jwt.handle'
import { NextFunction, Request, Response } from 'express'

const validateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.headers.authorization) {
            return res.status(403).send({ message: 'Token is required' })
        }

        const token = req.headers.authorization.split(' ')[1]
        verifyToken(token)

        const auth = await AuthModel.findOne({ token })
        if (!auth) return res.status(403).send({ message: 'Invalidate Token' })

        next()
    } catch (error) {
        return res.status(403).send(error)
    }
}

const validateTokenPassUserId = async (
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

        req.userId = user?.id

        next()
    } catch (error) {
        return res.status(403).send(error)
    }
}

const validateAccessRoot = async (
    req: Request,
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

        const user = await UserModel.findOne({
            email: tokenUser.email,
            username: tokenUser.username,
            role: tokenUser.role
        })

        if (user && user.role === 'admin') next()
        else return res.status(403).send({ message: 'No tienes autorización' })
    } catch (error) {
        return res.status(500).json({
            message: 'Error in the request - Permission'
        })
    }
}

export { validateToken, validateTokenPassUserId, validateAccessRoot }
