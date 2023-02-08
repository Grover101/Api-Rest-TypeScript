import {
    deleteUser,
    getUserId,
    getUsers,
    insertUser,
    updateUser
} from '@services/user.services'
import { handleHttp } from '@utils/error.handle'
import { type Request, type Response } from 'express'

export default {
    async index(_req: Request, res: Response) {
        try {
            const users = await getUsers()
            return res.status(200).json(users)
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    },
    async show({ params }: Request, res: Response) {
        try {
            const user = await getUserId(params.id)
            return res.status(200).json(user ?? { message: 'Not Found User' })
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    },
    async create({ body }: Request, res: Response) {
        try {
            const user = await insertUser(body)
            return res.status(200).json(user)
        } catch (error) {
            handleHttp(res, 'Error in the request', error)
        }
    },
    async update({ body, params }: Request, res: Response) {
        try {
            const user = await updateUser(params.id, body)
            return res.status(200).json(user ?? { message: 'Not found User' })
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    },
    async delete({ params }: Request, res: Response) {
        try {
            const user = await deleteUser(params.id)
            return user
                ? res.status(200).json({ message: 'Tweet deleted' })
                : res.status(404).json({
                      message: 'Not found User'
                  })
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    }
}
