import 'dotenv/config'
import mongoose from 'mongoose'

async function dbConnect(): Promise<void> {
    const DB_URI: string =
        process.env.MONGO_URI ?? 'mongodb://localhost:27017/MiniTwitter'

    mongoose.set('strictQuery', true)
    await mongoose.connect(DB_URI)
}

export default dbConnect
