import 'dotenv/config'
import mongoose from 'mongoose'

export const connect = async (): Promise<void> => {
    const DB_URI: string =
        process.env.NODE_ENV === 'dev'
            ? process.env.MONGO_URI_DEV ?? ''
            : process.env.NODE_ENV === 'test'
            ? process.env.MONGO_URI_TEST ?? ''
            : process.env.MONGO_URI_PRO ?? ''
    mongoose.set('strictQuery', true)
    await mongoose.connect(DB_URI)
}

export const close = async (): Promise<void> =>
    await mongoose.connection.close()
