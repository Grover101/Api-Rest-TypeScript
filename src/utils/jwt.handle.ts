import { sign, verify } from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || 'api_mini_twitter'

const generateToken = (
    username: string,
    email: string,
    role: string,
    expire = {}
) => {
    return sign({ username, email, role }, JWT_SECRET, expire)
}

const verifyToken = (token: string) => {
    return verify(token, JWT_SECRET)
}

export { generateToken, verifyToken }
