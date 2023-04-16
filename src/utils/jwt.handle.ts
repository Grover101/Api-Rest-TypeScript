import { sign } from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || 'api_mini_twitter'

const generateToken = async (
    username: string,
    email: string,
    role: string,
    expire = {}
) => {
    return sign({ username, email, role }, JWT_SECRET, expire)
}

export { generateToken }
