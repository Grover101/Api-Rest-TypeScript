import { handleHttp } from '@utils/error.handle'
import { type Request, type Response } from 'express'

export default {
    index(_req: Request, res: Response) {
        try {
            const option = 'hola'
            return res.status(200).json({ all: option })
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    },
    show(_req: Request, res: Response) {
        try {
            const option = 'hola'
            return res.status(200).json({ all: option })
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    },
    create(_req: Request, res: Response) {
        try {
            const option = 'hola'
            return res.status(200).json({ all: option })
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    },
    createLike(_req: Request, res: Response) {
        try {
            const option = 'hola'
            return res.status(200).json({ all: option })
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    },
    update(_req: Request, res: Response) {
        try {
            const option = 'hola'
            return res.status(200).json({ all: option })
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    },
    delete(_req: Request, res: Response) {
        try {
            const option = 'hola'
            return res.status(200).json({ all: option })
        } catch (error) {
            handleHttp(res, 'Error in the request')
        }
    }
}
