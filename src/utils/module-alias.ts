import * as path from 'path'
import moduleAlias from 'module-alias'

const files = path.resolve(__dirname, '../..')

moduleAlias.addAliases({
    '@routes': path.join(files, 'src/routes'),
    '@controllers': path.join(files, 'src/controllers'),
    '@middlewares': path.join(files, 'src/middlewares'),
    '@models': path.join(files, 'src/models'),
    '@config': path.join(files, 'src/config'),
    '@utils': path.join(files, 'src/utils'),
    '@interfaces': path.join(files, 'src/interfaces'),
    '@services': path.join(files, 'src/services'),
    '@testHelper': path.join(files, '__test__/src/helper'),
    '@app': path.join(files, 'src/app.ts')
})
