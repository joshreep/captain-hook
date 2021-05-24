import prettier from 'prettier'
const config = require('.././prettierrc')

export default (code: string) => prettier.format(code, config)
