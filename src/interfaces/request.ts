import { Request } from 'express'

export interface RequestExt extends Request {
    userId?: string | null
}
