import { Router } from 'express'
import { readdirSync } from 'fs'

const PATH_ROUTER = `${__dirname}`
const router = Router()

const cleanFileName = (fileName: string): string => {
    const file = fileName.split('.').shift()
    return file ?? 'index'
}

readdirSync(PATH_ROUTER).forEach(fileName => {
    const cleanName: string = cleanFileName(fileName)
    if (cleanName !== 'index') {
        import(`./${cleanName}`)
            .then(moduleRouter => {
                console.log(`Loading route...  /${cleanName}`)

                router.use(`/${cleanName}`, moduleRouter.router)
            })
            .catch(error => {
                console.log('error:', error)
            })
    }
})

export { router }
