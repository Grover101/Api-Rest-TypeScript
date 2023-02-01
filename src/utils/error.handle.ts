import { type Response } from 'express'

const handleHttp = (res: Response, error: string, errorRaw?: any): unknown => {
    console.log(typeof errorRaw)

    return res.status(500).json({ message: error, error: errorRaw?._message })
}

export { handleHttp }
