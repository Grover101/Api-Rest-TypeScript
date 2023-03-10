import { type Response } from 'express'

const handleHttp = (
    res: Response,
    error: string,
    errorRaw?: unknown
): Response => {
    return res.status(500).json({ message: error, error: errorRaw })
}

export { handleHttp }
