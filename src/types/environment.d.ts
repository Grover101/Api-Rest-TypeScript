export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: number
            HOST: string
            MONGO_URI: string
            ENV: 'test' | 'dev' | 'prod'
        }
    }
}
