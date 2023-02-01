import { type Response } from 'express'

const handleHttp = (res: Response, error: string): unknown => {
    return res.status(500).json({ message: error })
}

export { handleHttp }
