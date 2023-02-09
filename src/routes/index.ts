import { Router } from 'express'
import { readdirSync } from 'fs'

const PATH_ROUTER = `${__dirname}`
const router = Router()

const cleanFileName = (fileName: string): string | undefined => {
    const file: string | undefined = fileName.split('.').shift()
    return file
}

readdirSync(PATH_ROUTER).forEach(fileName => {
    const cleanName: string | undefined = cleanFileName(fileName)
    if (cleanName !== 'index' && cleanName !== undefined) {
        import(`./${cleanName}`)
            .then(moduleRouter => {
                router.use(`/${cleanName}`, moduleRouter.router)
            })
            .catch(error => {
                console.log('error:', error)
            })
    }
})

export { router }
