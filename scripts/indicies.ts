#!/usr/bin/env node
type HookFile = {
    name: string
    path: string
    fullPath: string
}
/**
 * @file
 * This script generates index files for each sub-module.
 */

import fs from 'fs'
import path from 'path'
import prettier from './prettier'
import listHooks from './listHooks'

const generatedAutomaticallyMessage =
    "// This file is generated automatically by `scripts/indices.js`. Please, don't change it"

listHooks().then((hooks) => {})

function writeFile(relativePath: string, content: string) {
    return fs.writeFileSync(path.resolve(process.cwd(), relativePath), prettier(content))
}

function generateIndex(files: HookFile[]) {
    const fileLines = files.map((hook) => `export { default as ${hook.name}}`)
}
