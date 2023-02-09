import express, { Response } from 'express'
import cors from 'cors'
import { router } from '@routes/index'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1', router)
app.use('/', (_req, res: Response): void => {
    res.status(200).json({ message: 'Welcome API Mini Twitter.' })
})

export default app
