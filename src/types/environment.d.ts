export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: number
            HOST: string
            MONGO_URI_DEV: string
            MONGO_URI_TEST: string
            MONGO_URI_PRO: string
            NODE_ENV: 'test' | 'dev' | 'prod'
            JWT_SECRET: string
        }
    }
}
