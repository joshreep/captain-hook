import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

const exists = promisify(fs.exists)
const readDir = promisify(fs.readdir)

const ignoreFiles = ['index.ts', 'packages.json', 'types.ts']

export default async function listHooks() {
    const srcPath = path.join(process.cwd(), 'src')
    const files = await readDir(srcPath)

    return Promise.all(
        files
            .filter((file) => /^[^._]/.test(file) && !ignoreFiles.includes(file))
            .map(async (file) => {
                const isTs = await exists(path.join(srcPath, file, 'index.ts'))

                return { name: file, path: `./${file}`, fullPath: `./src/${file}/index.${isTs ? 'ts' : 'js'}` }
            })
    )
}
