import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from '@routes/index'
import dbConnect from '@config/mongo'

const PORT: number = !Number.isNaN(process.env.PORT)
    ? Number(process.env.PORT)
    : 9000
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/v1', router)

void dbConnect().then(() => {
    console.log('DB is connected to mongo')
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://${process.env.HOST}:${PORT}`)
})
