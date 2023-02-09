import 'dotenv/config'
import { connect } from '@config/mongo'
import app from './app'

const PORT: number = !Number.isNaN(process.env.PORT)
    ? Number(process.env.PORT)
    : 9000

void connect()
    .then(() => {
        console.log('DB is connected to mongo')
    })
    .catch(error => {
        console.error('Database connection error', error)
    })

app.listen(PORT, () => {
    console.log(`Server is running on port http://${process.env.HOST}:${PORT}`)
})
