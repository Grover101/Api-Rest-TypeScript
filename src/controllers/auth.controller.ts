import { handleHttp } from '@utils/error.handle'
import { type Request, type Response } from 'express'

export default {
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            // service login
            return res.status(200).json({ email, password })
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    },
    async register({ body }: Request, res: Response) {
        try {
            const { username, email, password } = body
            // service register
            return res.status(201).json({ username, email, password })
        } catch (error) {
            handleHttp(res, 'Error in the request', error)
        }
    }
}
