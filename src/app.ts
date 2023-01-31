import 'dotenv/config'
import express, { type Response, type Request, Router } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const PORT = process.env.PORT ?? 3000
const app = express()
app.use(cors())

mongoose
    .connect(`mongodb://${process.env.HOST_MONGO ?? 'localhost'}/prueba`)
    .then(db => {
        console.log('DB is connected to', db.connection.host)
    })
    .catch(error => {
        console.log('error:', error)
    })

const router = Router()

router.get('/api', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello World!!!' })
})

app.use('/', router)

app.listen(PORT, () => {
    console.log(
        `Server is running on port http://${
            process.env.HOST ?? 'localhost'
        }:${PORT}`
    )
})
